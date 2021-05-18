import { TodoItemRS } from '../interfaces'

export class TodoItemFactory {
  static create(title: string): TodoItemRS {
    return {
      id: `i_${Math.floor(Math.random() * 1000000)}`,
      listId: 'l_1', // TODO: manage magic string
      title: title,
      completedAt: -1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: -1,
    }
  }
}
