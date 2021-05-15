import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { RootState } from '../store'
import { addNewList } from '../reducers/todo-slice'

function Landing() {
  const dispatch = useDispatch()
  const allTodoLists = useSelector((state: RootState) => state.todo.lists)
  let path: string

  console.log('process.env:', process.env)

  if (allTodoLists.length === 0) {
    const DEFAULT_ID = '1'
    dispatch(
      addNewList({
        todoListId: DEFAULT_ID,
        todoListTitle: 'Untitled List',
      })
    )
    path = `/todos/${DEFAULT_ID}`
  } else {
    const firstTodoList = allTodoLists[0]
    path = `/todos/${firstTodoList.id}`
  }

  return <Redirect to={path} />
}

export default Landing
