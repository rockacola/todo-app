export interface TodoItem {
  id: string
  // createdAt: number // timestamp in ms
  // updatedAt: number // timestamp in ms
  title: string
  isComplete: boolean
}

export interface TodoList {
  id: string
  title: string
  items: TodoItem[]
}

/**
 * For sake of simplicity dealing with DeclareType, avoid nullable type
 */
export interface TodoItemRS {
  id: string
  listId: string
  title: string
  completedAt: number // timestamp in sec, -1 for 'undefined'
  createdAt: number // timestamp in sec
  updatedAt: number // timestamp in sec, -1 for 'undefined'
}
