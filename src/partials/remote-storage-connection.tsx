import { RefreshIcon } from '@heroicons/react/outline'

interface Props {
  isConnected: boolean
  onConnect: any
  onDisconnect: any
}

export function RemoteStorageConnection({
  isConnected,
  onConnect,
  onDisconnect,
}: Props) {
  const connectionToggleHandler = (e: React.MouseEvent) => {
    if (isConnected) {
      onDisconnect()
    } else {
      onConnect()
    }
  }
  const operatorTitle = isConnected
    ? 'Disconnect from RemoteStorage'
    : 'Connect to a RemoteStorage'
  const additionalClasses = isConnected ? 'bg-red-500' : ''

  return (
    <div className="absolute top-6 right-6">
      <div
        className={`p-2 bg-gray-200 rounded-full transition hover:bg-opacity-80 cursor-pointer text-gray-50 ${additionalClasses}`}
        onClick={connectionToggleHandler}
        title={operatorTitle}
      >
        <RefreshIcon className="w-6 h-6" />
      </div>
    </div>
  )
}
