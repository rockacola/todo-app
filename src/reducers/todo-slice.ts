import { createSlice } from '@reduxjs/toolkit'
import { TodoStorageHandler } from '../handlers'
import { TodoItem, TodoList } from '../interfaces'

interface TodoState {
  lists: TodoList[]
}

const initialState: TodoState = {
  lists: TodoStorageHandler.getLists(),
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addNewList: (state, action) => {
      const todoListId: string = action.payload.todoListId
      // TODO: check if the supplied ID is indeed unique
      const todoListTitle: string = action.payload.todoListTitle
      state.lists.push({
        id: todoListId,
        title: todoListTitle,
        items: [],
      })

      TodoStorageHandler.setLists(state.lists)
    },

    addItemToExistingList: (state, action) => {
      const todoListId: string = action.payload.todoListId
      const todoItem: TodoItem = action.payload.todoItem

      const targetList = state.lists.find((list) => list.id === todoListId)
      if (!targetList) {
        return
      }

      targetList.items.push(todoItem)
      TodoStorageHandler.setLists(state.lists)
    },

    editItem: (state, action) => {
      const todoListId: string = action.payload.todoListId
      const todoItem: TodoItem = action.payload.todoItem

      const targetList = state.lists.find((list) => list.id === todoListId)
      if (!targetList) {
        // TODO: warning
        return
      }

      const targetItem = targetList.items.find(
        (item) => item.id === todoItem.id
      )
      if (!targetItem) {
        // TODO: warning
        return
      }

      targetItem.title = todoItem.title
      targetItem.isComplete = todoItem.isComplete
      TodoStorageHandler.setLists(state.lists)
    },

    deleteItem: (state, action) => {
      const todoListId: string = action.payload.todoListId
      const todoItemId: string = action.payload.todoItemId

      const targetList = state.lists.find((list) => list.id === todoListId)
      if (!targetList) {
        // TODO: warning
        return
      }

      const newItems = targetList.items.filter((item) => item.id !== todoItemId)
      targetList.items = newItems
      TodoStorageHandler.setLists(state.lists)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNewList, addItemToExistingList, deleteItem, editItem } =
  todoSlice.actions

export default todoSlice.reducer
