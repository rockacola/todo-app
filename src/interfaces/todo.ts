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
