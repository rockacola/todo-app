import { padStart } from 'lodash'
import { TodoItemRS } from '../interfaces'

const FIXED_LIST_ID = `l_1`

export class TodoItemFactory {
  static create(title: string): TodoItemRS {
    const id = padStart(Math.floor(Math.random() * 1000000).toString(), 6, '0')

    return {
      id: `i_${id}`,
      listId: FIXED_LIST_ID,
      title: title,
      completedAt: -1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: -1,
    }
  }
}
