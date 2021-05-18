import React, { useEffect, useState } from 'react'
import RemoteStorage from 'remotestoragejs'
import { DrinksModule } from '../modules/drinks-module'

const CLAIM_DIR = 'myDrinks'
let remoteStorage: RemoteStorage

interface DrinkItem {
  id: string
  name: string
}

function Drinks() {
  console.log('Drinks component rendered.')

  const [newItemTitle, setNewItemTitle] = useState<string>('')
  const [displayDrinks, setDisplayDrinks] = useState<DrinkItem[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const initRemoteStorage = () => {
    console.log('initRemoteStorage triggered.')

    remoteStorage = new RemoteStorage({
      logging: false,
      modules: [DrinksModule],
    })
    remoteStorage.access.claim(CLAIM_DIR, 'rw')
    // const remoteClient = remoteStorage.scope('/' + CLAIM_DIR + '/');

    remoteStorage.on('ready', () => {
      console.log('remoteStorage.ready event triggered.')
    })

    remoteStorage.on('connected', () => {
      console.log('remoteStorage.connected event triggered.')
      updateDisplayDrinks()
      setIsConnected(true)
    })

    remoteStorage.on('network-offline', () => {
      console.log('remoteStorage.network-offline event triggered.')
    })

    remoteStorage.on('network-online', () => {
      console.log('remoteStorage.network-online event triggered.')
    })

    remoteStorage.on('disconnected', () => {
      console.log('remoteStorage.disconnected event triggered.')
      setIsConnected(false)
    })

    remoteStorage.on('error', (err: any) => {
      console.log('remoteStorage.error event triggered. err:', err)
    })
  }

  useEffect(() => {
    console.log('Component onMount triggered.')

    // setDisplayDrinks([
    //   {id: '12', name: 'One'},
    //   {id: '13', name: 'Two'}
    // ])

    initRemoteStorage()
  }, [])

  const updateDisplayDrinks = async () => {
    const fetchedDrinks = await (remoteStorage as any).myDrinks.listDrinks()
    const drinksArray = Object.values(fetchedDrinks).filter((item) => typeof item === 'object')
    console.log('drinksArray:', drinksArray)
    setDisplayDrinks(drinksArray as DrinkItem[])
  }

  const onNewItemTitleChangeHandler = (e: React.ChangeEvent) => {
    // console.log('onNewItemTitleChangeHandler triggered. e:', e)
    setNewItemTitle((e.target as any).value) // TODO: typing
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    ;(remoteStorage as any).myDrinks.addDrink(newItemTitle)
    setNewItemTitle('')
    updateDisplayDrinks()
  }

  const onItemDeleteHandler = (item: DrinkItem) => {
    console.log('onItemDeleteHandler triggered. item:', item)
    console.log('remoteStorage:', remoteStorage)
    const storageItemId = item.name.toLowerCase().replace(/\s|\//g, '-'); // TODO: hash it reliably
    ;(remoteStorage as any).myDrinks.removeDrink(storageItemId)
    updateDisplayDrinks()
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

  const renderDrinkItem = (item: DrinkItem, index: number) => (
    <div key={index} className="p-2 my-2 bg-red-50 rounded flex items-center">
      <div className="flex-grow">{item.name}</div>
      <div
        className="p-2 bg-blue-100 hover:bg-blue-200 cursor-pointer"
        onClick={() => onItemDeleteHandler(item)}
      >
        [X]
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-100 max-w-xl h-full mx-auto bg-white py-4 md:px-4">
        <h1 className="text-lg font-bold text-gray-800 text-center leading-tight p-4">
          Drink List
        </h1>
        <div className="my-2 text-center">
          <div className="inline-block p-2 bg-indigo-200 hover:bg-indigo-300 rounded">
            {!isConnected ? (
              <button onClick={connectHandler}>Connect</button>
            ) : (
              <button onClick={disconnectHandler}>Disconnect</button>
            )}
          </div>
        </div>
        <div className="">
          {displayDrinks.map((item, index) => renderDrinkItem(item, index))}
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

export default Drinks
