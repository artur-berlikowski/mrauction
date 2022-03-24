import { useState } from 'react'
import { Navbar, Nav, Container, Form } from "react-bootstrap"
//Components
import UserPanel from './UserPanel'

const Navigation = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  function updateUsername(event) {
    setUsername(event.target.value)
  }

  function updatePassword(event) {
    setPassword(event.target.value)
  }

  return (
    <Navbar>
      <Container className="m-0 p-0">
        <Navbar.Brand href="/"><img src="/image/logo.svg" height="64" /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/auctions">Auctions</Nav.Link>
          <Nav.Link href="/watching">Watching</Nav.Link>
        </Nav>
        <Form className="d-flex flex-column">
          <Form.Control className="form-control-sm mb-1" type="text" placeholder="username" onChange={updateUsername} />
          <Form.Control className="form-control-sm mb-1" type="password" placeholder="password" onChange={updatePassword} />
          <UserPanel {...{ username, password }} />
        </Form>
      </Container>
    </Navbar>
  )
}

export default Navigation