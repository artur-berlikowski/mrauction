import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Container, Button } from 'react-bootstrap'

const UserPanel = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function updateUsername(event) {
    setUsername(event.target.value)
  }

  function updatePassword(event) {
    setPassword(event.target.value)
  }

  async function login(event) {
    event.preventDefault()
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    let response = await (await fetch('http://localhost:3001/auth', requestOptions)).json()
    console.log(response)
  }

  return (
    <Form className="d-flex flex-column">
      <Form.Control className="form-control-sm mb-1" type="text" placeholder="username" onChange={updateUsername} />
      <Form.Control className="form-control-sm mb-1" type="password" placeholder="password" onChange={updatePassword} />
      <Container id="user_panel" fluid className="d-flex flex-row-reverse m-0 p-0">
        <Link to="/user/register"><Button type="button" className="btn btn-primary btn-sm text-center">Register</Button></Link>
        <Button type="button" className="btn btn-primary btn-sm text-center mx-1" onClick={login}>Sign In</Button>
      </Container>
    </Form>
  )
}

export default UserPanel