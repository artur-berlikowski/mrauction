import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
//Components
import Navigation from './components/Navigation'

function App() {
  const [loggedIn, setLoggedIn] = useState()

  useEffect(async () => {
    let response = await (await fetch('http://localhost:3001/auth/', { withCredentials: true, credentials: 'include' })).json()
    console.log(response.data.loggedIn)
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
