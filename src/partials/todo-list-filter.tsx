import { FilterIcon } from '@heroicons/react/outline'
import { FilterOptionItem } from '../interfaces/filter'

interface Props {
  filterOption: FilterOptionItem
  onClick: () => void
}

export function TodoListFilter({ filterOption, onClick }: Props) {
  return (
    <div
      className="flex w-36 items-center bg-indigo-300 bg-opacity-60 transition hover:bg-opacity-100 rounded-tl-lg px-3 py-2 cursor-pointer text-gray-600"
      onClick={onClick}
    >
      <FilterIcon className="w-4 h-4" />
      <span className="ml-2">{filterOption.label}</span>
    </div>
  )
}
