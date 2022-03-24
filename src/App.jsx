import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
//Components
import Navigation from './components/Navigation'
//Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Container>
            <Navigation />
          </Container>
        </Col>
      </Row>
      <Outlet />
    </Container>
  )
}

export default App
