import { useState } from 'react'
import RemoteStorage from 'remotestoragejs'
// import Widget from 'remotestorage-widget'

const remoteStorage = new RemoteStorage({ logging: true })

// const userAddress = `yenct@5apps.com`

function NotFound() {
  const [isConnected, setIsConnected] = useState<boolean>(false)

  remoteStorage.access.claim('myFooBar', 'rw')
  // remoteStorage.caching.enable('/myfavoritedrinks/')

  // const widget = new Widget(remoteStorage)

  console.log('remoteStorage:', remoteStorage)
  // console.log('widget:', widget)

  remoteStorage.on('connected', () => {
    console.log('remoteStorage.connected event triggered.')
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

  remoteStorage.on('error', () => {
    console.log('remoteStorage.error event triggered.')
  })

  // widget.attach('root')

  // const userAddress = `yenct@5apps.com`
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

  return (
    <div className="h-screen bg-gray-100">
      <div className="py-8">
        <div className="w-100 max-w-sm mx-auto bg-white rounded p-4 text-center">
          <h1 className="text-lg font-bold text-gray-800">Not Found</h1>
          <p>Check your URL and try again.</p>

          <div className="mt-8 p-2 bg-red-200 rounded inline-block">
            {!isConnected ? (
              <button onClick={connectHandler}>Connect</button>
            ) : (
              <button onClick={disconnectHandler}>Disconnect</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
