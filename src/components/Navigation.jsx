import { Navbar, Nav, Container, Form, Button } from "react-bootstrap"

const Navigation = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/"><img src="/image/logo.svg" height="72" /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/auctions">Auctions</Nav.Link>
          <Nav.Link href="/watching">Watching</Nav.Link>
        </Nav>
        <Form className="d-flex justify-content-center align-items-center">
          <Form.Control type="text" placeholder="username" />
          <Form.Control className="" type="text" placeholder="password" />
          <Button>Sign in</Button>
        </Form>
      </Container>
    </Navbar>
  )
}

export default Navigation