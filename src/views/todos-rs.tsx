import { TrashIcon } from '@heroicons/react/outline'
import { clone } from 'lodash'
import React, { useEffect, useState } from 'react'
import RemoteStorage from 'remotestoragejs'
import { TimingHelper } from '../helpers'
import { TodoItemRS } from '../interfaces'
import { TodosModule } from '../modules/todos-module'

const CLAIM_DIR = 'myTodos'
let remoteStorage: RemoteStorage

function TodosRS() {
  // console.log('TodosRS component rendered.')

  const [newItemTitle, setNewItemTitle] = useState<string>('')
  const [displayTodoItems, setDisplayTodoItems] = useState<TodoItemRS[]>([])
  const [isRemoteStorageConnected, setIsRemoteStorageConnected] =
    useState<boolean>(false)

  const initRemoteStorage = () => {
    console.log('initRemoteStorage triggered.')

    remoteStorage = new RemoteStorage({
      logging: false,
      modules: [TodosModule],
    })
    remoteStorage.access.claim(CLAIM_DIR, 'rw')
    // const remoteClient = remoteStorage.scope('/' + CLAIM_DIR + '/');

    remoteStorage.on('ready', () => {
      console.log('remoteStorage.ready event triggered.')
    })

    remoteStorage.on('connected', () => {
      console.log('remoteStorage.connected event triggered.')
      updateDisplayTodoItems()
      setIsRemoteStorageConnected(true)
    })

    remoteStorage.on('network-offline', () => {
      console.log('remoteStorage.network-offline event triggered.')
    })

    remoteStorage.on('network-online', () => {
      console.log('remoteStorage.network-online event triggered.')
    })

    remoteStorage.on('disconnected', () => {
      console.log('remoteStorage.disconnected event triggered.')
      setIsRemoteStorageConnected(false)
    })

    remoteStorage.on('error', (err: any) => {
      console.log('remoteStorage.error event triggered. err:', err)
    })
  }

  useEffect(() => {
    console.log('Component onMount triggered.')
    initRemoteStorage()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateDisplayTodoItems = async (delay = 0) => {
    // Inject artificial delay as a way to workaround racing condition
    if (delay > 0) {
      await TimingHelper.sleep(delay)
    }

    console.log('updateDisplayTodoItems triggered.')
    const todoItemsRes = await (remoteStorage as any).myTodos.listTodoItems()
    console.log('todoItemsRes:', todoItemsRes)
    const todoItemsArray = Object.values(todoItemsRes).filter(
      (item) => typeof item === 'object'
    )
    console.log('todoItemsArray:', todoItemsArray)
    setDisplayTodoItems(todoItemsArray as TodoItemRS[])
  }

  const onNewItemTitleChangeHandler = (e: React.ChangeEvent) => {
    // console.log('onNewItemTitleChangeHandler triggered. e:', e)
    setNewItemTitle((e.target as any).value) // TODO: typing
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    // TODO: mvoe builder into its own helper
    const newItem: TodoItemRS = {
      id: `i_${Math.floor(Math.random() * 1000000)}`,
      listId: 'l_1', // TODO: manage magic string
      title: newItemTitle,
      completedAt: -1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: -1,
    }
    ;(remoteStorage as any).myTodos.addTodoItem(newItem)
    setNewItemTitle('')
    updateDisplayTodoItems(500)
  }

  const onIsCompleteToggleHandler = (item: TodoItemRS) => {
    console.log('onIsCompleteToggleHandler triggered. item:', item)

    const mutatedItem = clone(item)
    mutatedItem.completedAt =
      item.completedAt > -1 ? -1 : Math.floor(Date.now() / 1000)
    mutatedItem.updatedAt = Math.floor(Date.now() / 1000)
    ;(remoteStorage as any).myTodos.updateTodoItem(mutatedItem)
    updateDisplayTodoItems()
  }

  const onItemDeleteHandler = (item: TodoItemRS) => {
    console.log('onItemDeleteHandler triggered. item:', item)
    ;(remoteStorage as any).myTodos.removeTodoItem(item.id)
    updateDisplayTodoItems()
  }

  const connectHandler = () => {
    console.log('connectHandler triggered.')
    var account = prompt('What is your account (eg name@example.com)?')
    if (account) {
      console.log(`connecting to ${account} ...`)
      remoteStorage.connect(account)
    }
  }

  const disconnectHandler = () => {
    remoteStorage.disconnect()
  }

  const renderTodoItem = (item: TodoItemRS, index: number) => {
    const isCompleted = item.completedAt > -1
    const titleAdditionalClasses = isCompleted ? 'line-through' : ''

    return (
      <div
        key={index}
        className="p-2 my-2 bg-red-50 transition hover:bg-red-100 rounded flex items-stretch"
      >
        <div
          className="p-4 bg-blue-100 rounded transition hover:bg-blue-200 cursor-pointer"
          onClick={() => onIsCompleteToggleHandler(item)}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            className="cursor-pointer"
            onChange={() => {}}
          />
        </div>
        <div
          className={`flex-grow ml-2 flex items-center ${titleAdditionalClasses}`}
        >
          {item.title}
        </div>
        <div
          className="px-4 py-2 bg-blue-100 rounded transition hover:bg-blue-200 cursor-pointer flex items-center"
          onClick={() => onItemDeleteHandler(item)}
        >
          <TrashIcon className="w-4 h-4 text-red-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-100 max-w-xl h-full mx-auto bg-white py-4 md:px-4">
        <h1 className="text-lg font-bold text-gray-800 text-center leading-tight p-4">
          Todo List
        </h1>
        <div className="my-2 text-center">
          <div className="inline-block p-2 bg-indigo-200 hover:bg-indigo-300 rounded">
            {!isRemoteStorageConnected ? (
              <button onClick={connectHandler}>Connect</button>
            ) : (
              <button onClick={disconnectHandler}>Disconnect</button>
            )}
          </div>
        </div>
        <div className="">
          {displayTodoItems.map((item, index) => renderTodoItem(item, index))}
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
      </div>
    </div>
  )
}

export default TodosRS
