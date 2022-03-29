import { Navbar, Nav, Container, Form } from "react-bootstrap"
//Components
import UserPanel from './UserPanel'

const Navigation = (props) => {
  let { loggedIn } = props

  return (
    <Navbar>
      <Container className="m-0 p-0">
        <Navbar.Brand href="/"><img src="/image/logo.svg" height="64" /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/auctions">Auctions</Nav.Link>
          <Nav.Link href="/watching">Watching</Nav.Link>
        </Nav>
        <UserPanel {...{ loggedIn }} />
      </Container>
    </Navbar>
  )
}

export default Navigation