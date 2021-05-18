import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import Landing from './views/landing'
import NotFound from './views/not-found'
import TodoList from './views/todo-list'
import TodosRS from './views/todos-rs'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/todos/:id" exact>
            <TodoList />
          </Route>
          <Route path="/todos_rs" exact>
            <TodosRS />
          </Route>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
