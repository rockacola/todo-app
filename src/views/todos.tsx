import { CheckIcon, EmojiHappyIcon, TrashIcon } from '@heroicons/react/outline'
import { clone, sortBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RemoteStorage from 'remotestoragejs'
import { TodoItemFactory } from '../factories'
import { CastHelper, TimingHelper } from '../helpers'
import { TodoItemRS } from '../interfaces'
import { TodosModule } from '../modules/todos-module'
import { AddTodoItemForm } from '../partials/add-todo-item-form'
import { RemoteStorageConnection } from '../partials/remote-storage-connection'

const CLAIM_DIR = process.env.REACT_APP_STORAGE_CLAIM_DIR
let remoteStorage: RemoteStorage

function Todos() {
  // console.log('TodosRS component rendered.')
  // console.log('process.env:', process.env)

  const [newItemTitle, setNewItemTitle] = useState<string>('')
  const [displayTodoItems, setDisplayTodoItems] = useState<TodoItemRS[]>([])
  const [isRemoteStorageConnected, setIsRemoteStorageConnected] =
    useState<boolean>(false)

  const initRemoteStorage = () => {
    console.log('initRemoteStorage triggered.')

    remoteStorage = new RemoteStorage({
      logging: CastHelper.toBool(process.env.REACT_APP_STORAGE_LOG_ENABLED),
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
      toast.info('RemoteStorage connected!')
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
      toast.info('RemoteStorage disconnected!')
    })

    remoteStorage.on('error', (err: any) => {
      console.log('remoteStorage.error event triggered. err:', err)
    })

    remoteStorage.onChange(`/${CLAIM_DIR}/`, () => {
      console.log('remoteStorage.onChange event triggered.')
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

    // console.log('updateDisplayTodoItems triggered.')
    const todoItemsRes = await (remoteStorage as any).myTodos.listTodoItems()
    // console.log('todoItemsRes:', todoItemsRes)
    const todoItems = Object.values(todoItemsRes).filter(
      (item) => typeof item === 'object'
    ) as TodoItemRS[]
    // console.log('todoItemsArray:', todoItemsArray)
    const sortedItems = sortBy(todoItems, (item) => item.createdAt)

    setDisplayTodoItems(sortedItems)
  }

  const onNewItemTitleChangeHandler = (e: React.ChangeEvent) => {
    // console.log('onNewItemTitleChangeHandler triggered. e:', e)
    setNewItemTitle((e.target as any).value) // TODO: typing
  }

  const performAddTodoItem = async (newItem: TodoItemRS) => {
    await (remoteStorage as any).myTodos.addTodoItem(newItem)
    await updateDisplayTodoItems()
    setNewItemTitle('') // Reset input filed
    toast.success('New todo item added.')
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    const newItem = TodoItemFactory.create(newItemTitle)
    performAddTodoItem(newItem)
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

  const performRemoveTodoItem = async (item: TodoItemRS) => {
    await (remoteStorage as any).myTodos.removeTodoItem(item.id)
    await updateDisplayTodoItems()
    toast.success('Todo item deleted.')
  }

  const onItemDeleteHandler = (item: TodoItemRS) => {
    console.log('onItemDeleteHandler triggered. item:', item)
    performRemoveTodoItem(item)
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
        className="p-2 my-2 bg-green-50 transition hover:bg-green-100 rounded flex items-stretch"
      >
        <div
          className="w-12 h-12 bg-green-300 bg-opacity-70 rounded-lg transition hover:bg-opacity-100 cursor-pointer text-green-800 flex items-center justify-center"
          onClick={() => onIsCompleteToggleHandler(item)}
        >
          {isCompleted && <CheckIcon className="w-8 h-8" />}
        </div>
        <div
          className={`flex-grow ml-4 flex items-center text-gray-800 ${titleAdditionalClasses}`}
        >
          {item.title}
        </div>
        <div
          className="px-4 py-2 bg-red-500 bg-opacity-70 rounded transition hover:bg-opacity-100 cursor-pointer flex items-center"
          onClick={() => onItemDeleteHandler(item)}
        >
          <TrashIcon className="w-4 h-4 text-gray-50" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-100 max-w-xl h-full mx-auto bg-white py-4 md:px-4 relative">
        <h1 className="text-lg font-bold text-gray-800 text-center leading-tight p-4 mb-4">
          Todo List
        </h1>
        <div className="">
          {displayTodoItems.map((item, index) => renderTodoItem(item, index))}
        </div>
        <div>
          <AddTodoItemForm
            title={newItemTitle}
            onSubmit={onSubmitHandler}
            onTitleChange={onNewItemTitleChangeHandler}
          />
        </div>
        <RemoteStorageConnection
          isConnected={isRemoteStorageConnected}
          onConnect={connectHandler}
          onDisconnect={disconnectHandler}
        />
        <div className="my-8">
          <EmojiHappyIcon className="w-16 h-16 text-gray-100 m-auto" />
        </div>
        <div className="text-sm text-gray-200 text-center">
          Todo App {process.env.REACT_APP_VERSION}
        </div>
      </div>
    </div>
  )
}

export default Todos
