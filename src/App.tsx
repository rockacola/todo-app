import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import Landing from './views/landing'
import NotFound from './views/not-found'
import TodosRS from './views/todos-rs'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/todos/1" exact>
            <TodosRS />
          </Route>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </Provider>
  )
}

export default App
