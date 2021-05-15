import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootStateHelper } from '../helpers'
import { TodoItem } from '../interfaces'
import { TodoItemBlock, TodoListFilter } from '../partials'
import {
  addItemToExistingList,
  deleteItem,
  editItem,
} from '../reducers/todo-slice'
import { RootState } from '../store'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { FilterOptionItem } from '../interfaces'
import { filterOptions } from '../data'

interface TodoListParam {
  id: string
}

function TodoList() {
  const dispatch = useDispatch()
  const params = useParams<TodoListParam>()
  const currentState = useSelector((state: RootState) => state)
  const [newItemTitle, setNewItemTitle] = useState<string>('')
  const [currentFilterOption, setCurrentFilterOption] =
    useState<FilterOptionItem>(filterOptions[0])
  const [selectedTodoItemId, setSelectedTodoItemId] = useState<string>('')
  const targetTodoListId = params.id // TODO: validate input and edge case handling
  const targetTodoList = RootStateHelper.getTodoListById(
    currentState,
    targetTodoListId
  ) // TODO: edge case handling
  const displayTodoItems: TodoItem[] = useMemo(() => {
    if (!targetTodoList) {
      return []
    }
    if (currentFilterOption.key === 'incomplete') {
      return targetTodoList.items.filter((item) => !item.isComplete)
    }
    if (currentFilterOption.key === 'completed') {
      return targetTodoList.items.filter((item) => !!item.isComplete)
    }
    return targetTodoList.items
  }, [currentFilterOption, targetTodoList])

  const onFilterOperatorClickHandler = () => {
    console.log('onFilterOperatorClickHandler triggered.')

    const nextFilterIndex =
      (currentFilterOption.index + 1) % filterOptions.length
    setCurrentFilterOption(filterOptions[nextFilterIndex])
    setSelectedTodoItemId('')
  }

  const onNewItemTitleChangeHandler = (e: React.ChangeEvent) => {
    // console.log('onNewItemTitleChangeHandler triggered. e:', e)
    setNewItemTitle((e.target as any).value) // TODO: typing
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)

    // TODO: input validation, boundary check etc
    // TODO: duplication detection

    const newTodoItem: TodoItem = {
      id: Math.floor(Math.random() * 1000000).toString(),
      title: newItemTitle,
      isComplete: false,
    }
    dispatch(
      addItemToExistingList({
        todoListId: targetTodoListId,
        todoItem: newTodoItem,
      })
    )
    setNewItemTitle('')
  }

  const onTodoItemContextToggleHandler = (item: TodoItem) => {
    if (selectedTodoItemId === item.id) {
      setSelectedTodoItemId('')
      return
    }
    setSelectedTodoItemId(item.id)
  }

  const onTodoItemEditHandler = (mutatedItem: TodoItem) => {
    console.log('onTodoItemEditHandler triggered.')

    dispatch(
      editItem({
        todoListId: targetTodoListId,
        todoItem: mutatedItem,
      })
    )
    setSelectedTodoItemId('')
  }

  const onTodoItemDeleteHandler = (item: TodoItem) => {
    console.log('onTodoItemDeleteHandler triggered.')

    dispatch(
      deleteItem({
        todoListId: targetTodoListId,
        todoItemId: item.id,
      })
    )
    setSelectedTodoItemId('')
  }

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-100 max-w-xl h-full mx-auto bg-white py-4 md:px-4">
        <h1 className="text-lg font-bold text-gray-800 text-center leading-tight p-4">
          {targetTodoList?.title}
        </h1>
        <div className="mt-4 flex justify-between">
          <div>{/* No content for now */}</div>
          <div>
            <TodoListFilter
              filterOption={currentFilterOption}
              onClick={onFilterOperatorClickHandler}
            />
          </div>
        </div>
        <div className="">
          {displayTodoItems.map((item, index) => (
            <TodoItemBlock
              key={item.id}
              item={item}
              isSelected={item.id === selectedTodoItemId}
              onContextToggle={onTodoItemContextToggleHandler}
              onEdit={onTodoItemEditHandler}
              onDelete={onTodoItemDeleteHandler}
            />
          ))}
        </div>
        <div>
          <form onSubmit={onSubmitHandler}>
            <div className="flex items-center">
              <input
                className="p-4 bg-gray-50 focus:bg-gray-100 flex-grow"
                type="text"
                name="title"
                value={newItemTitle}
                onChange={onNewItemTitleChangeHandler}
                placeholder="New item..."
              />
              <button
                className="px-3 py-4 bg-green-300 bg-opacity-60 transition hover:bg-opacity-100"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="my-8">
          <EmojiHappyIcon className="w-16 h-16 text-gray-100 m-auto" />
        </div>
      </div>
    </div>
  )
}

export default TodoList
