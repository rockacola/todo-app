import { TodoItem } from '../interfaces'
import { ClickableTodoItemBlock } from './clickable-todo-item-block'

export interface TodoItemBlockProps {
  item: TodoItem
  isSelected: boolean
  onContextToggle: (item: TodoItem) => void
  onEdit: (mutatedItem: TodoItem) => void
  onDelete: (item: TodoItem) => void
}

export function TodoItemBlock(props: TodoItemBlockProps) {
  const operationStyle = process.env.REACT_APP_OPERATION_STYLE
  // console.log('operationStyle:', operationStyle)

  if (operationStyle === 'click') {
    return <ClickableTodoItemBlock {...props} />
  }

  throw new Error(`Invalid operation style: [${operationStyle}]`)
}
