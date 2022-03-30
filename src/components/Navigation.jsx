import { Navbar, Nav, Container, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
//Components
import UserPanel from './UserPanel'

const Navigation = (props) => {
  let { loggedIn } = props
  let navigate = useNavigate()

  function handleMenuChoice(event) {
    event.preventDefault()
    navigate(`/${event.target.id}`)
  }

  return (
    <Navbar>
      <Container className="m-0 p-0">
        <Navbar.Brand href="/"><img src="/image/logo.svg" height="64" /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link id="auctions" onClick={handleMenuChoice}>Auctions</Nav.Link>
          <Nav.Link id="watching" onClick={handleMenuChoice}>Watching</Nav.Link>
        </Nav>
        <UserPanel {...{ loggedIn }} />
      </Container>
    </Navbar>
  )
}

export default Navigation