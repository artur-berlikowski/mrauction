import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
//Components
import Navigation from './components/Navigation'

function App() {
  const [loggedIn, setLoggedIn] = useState()

  let navigate = useNavigate()
  let location = useLocation()

  useEffect(async () => {
    let response = await (await fetch('http://localhost:3001/auth/', { credentials: 'include' })).json()
    setLoggedIn(response.data.loggedIn)
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container>
            <Navigation {...{ loggedIn }} />
          </Container>
        </Col>
      </Row>
      <Outlet />
    </Container>
  )
}

export default App
