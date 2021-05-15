import { TodoList } from '../interfaces'

export class TodoStorageHandler {
  static getLists(): TodoList[] {
    const dataStr = localStorage.getItem('todo-app:lists')
    if (!dataStr) {
      return []
    }
    const data = JSON.parse(dataStr)
    return data
  }

  static setLists(lists: TodoList[]) {
    const dataStr = JSON.stringify(lists)
    localStorage.setItem('todo-app:lists', dataStr)
  }
}
