import { TodoList } from '../interfaces'
import { RootState } from '../store'

export class RootStateHelper {
  static getTodoListById(
    state: RootState,
    todoListId: string
  ): TodoList | undefined {
    return state.todo.lists.find((list) => list.id === todoListId)
  }
}
