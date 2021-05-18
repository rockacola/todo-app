import { PlusIcon } from '@heroicons/react/outline'
import React from 'react'

interface Props {
  onSubmit: (e: React.FormEvent) => void
  title: string
  onTitleChange: (e: React.ChangeEvent) => void
}

export function AddTodoItemForm({ onSubmit, title, onTitleChange }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center">
        <input
          className="p-4 bg-gray-50 focus:bg-gray-100 flex-grow rounded-tl rounded-bl"
          type="text"
          name="title"
          value={title}
          onChange={onTitleChange}
          placeholder="New item..."
        />
        <button
          className="px-5 py-4 bg-green-400 bg-opacity-70 transition hover:bg-opacity-100 rounded-tr rounded-br"
          type="submit"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  )
}
