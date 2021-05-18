import { Redirect } from 'react-router'

function Landing() {
  console.log('process.env:', process.env)
  const path = `/todos/1`
  return <Redirect to={path} />
}

export default Landing
