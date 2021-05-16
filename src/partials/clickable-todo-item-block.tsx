import {
  ChevronRightIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { clone } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { TodoItemBlockProps } from './todo-item-block'

export function ClickableTodoItemBlock({
  item,
  isSelected,
  onContextToggle,
  onEdit,
  onDelete,
}: TodoItemBlockProps) {
  const [tempTitle, setTempTitle] = useState<string>(item.title)

  const onTempTitleChangeHandler = (e: React.ChangeEvent) => {
    setTempTitle((e.target as any).value) // TODO: typing
  }

  useEffect(() => {
    if (!isSelected) {
      setTempTitle(item.title)
    }
  }, [item, isSelected])

  const isEditEnabled = useMemo(() => {
    return item.title !== tempTitle
  }, [item, tempTitle])

  const onIsCompleteToggleHandler = () => {
    const muatedItem = clone(item)
    muatedItem.isComplete = !item.isComplete
    onEdit(muatedItem)
  }

  const onTitleEditHandler = () => {
    if (!isEditEnabled) {
      return
    }

    const muatedItem = clone(item)
    muatedItem.title = tempTitle
    onEdit(muatedItem)
  }

  return (
    <div
      className={`bg-blue-100 bg-opacity-50 transition-height hover:bg-opacity-80 overflow-hidden max-h-16 ${
        isSelected ? 'max-h-96' : ''
      }`}
    >
      <div className="flex items-stretch overflow-hidden" data-id={item.id}>
        <div
          className="px-5 py-4 transition bg-indigo-200 bg-opacity-0 hover:bg-opacity-40 cursor-pointer"
          onClick={onIsCompleteToggleHandler}
        >
          <input
            type="checkbox"
            checked={item.isComplete}
            className="checked:bg-blue-600 checked:border-transparent"
            onChange={() => {}}
          />
        </div>
        <div className="flex-grow">
          {!isSelected && <div className="p-4 leading-tight">{item.title}</div>}
          {isSelected && (
            <textarea
              className="p-4 w-full leading-tight bg-transparent"
              name="title"
              value={tempTitle}
              disabled={!isSelected}
              onChange={onTempTitleChangeHandler}
            />
          )}
        </div>

        {/* Context operator */}
        <div
          className="p-4 text-gray-500 transition bg-indigo-200 bg-opacity-0 hover:bg-opacity-40 cursor-pointer "
          onClick={() => onContextToggle(item)}
        >
          <ChevronRightIcon
            className={`w-6 h-6 transition-transform transform ${
              isSelected ? 'rotate-90' : ''
            }`}
          />
        </div>
      </div>

      {/* Context content */}
      <div
        className={`overflow-hidden transition-height max-h-0 ${
          isSelected ? 'max-h-96' : ''
        }`}
      >
        <div className="flex items-center justify-end">
          <div
            className={`p-4 ${
              isEditEnabled
                ? 'bg-indigo-500 bg-opacity-60 hover:bg-opacity-100 cursor-pointer'
                : 'bg-gray-200'
            } text-gray-100 transition `}
            onClick={onTitleEditHandler}
          >
            <PencilAltIcon className="w-6 h-6" />
          </div>
          <div
            className="p-4 bg-red-500 bg-opacity-60 hover:bg-opacity-100 text-gray-100 cursor-pointer transition"
            onClick={() => onDelete(item)}
          >
            <TrashIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
