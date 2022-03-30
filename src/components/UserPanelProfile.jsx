import { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'

const UserPanelProfile = () => {
  const [username, setUsername] = useState('')

  useEffect(async () => {
    let response = await (await fetch('http://localhost:3001/user/', { credentials: 'include' })).json()
    setUsername(response.name)
  }, [])

  async function logout(event) {
    event.preventDefault()
    let requestOptions = {
      method: 'GET',
      credentials: 'include'
    }
    let response = await (await fetch('http://localhost:3001/auth/logout', requestOptions)).json()
    document.location.reload(response.data)
  }

  return (
    <Container id="user_panel_profile" className="d-flex flex-row m-0 p-0">
      <Container className="d-flex flex-column content-justify-center align-items-center p-0">
        <div id="profile_image"></div>
        <span>{username}</span>
      </Container>
      <Container className="d-flex flex-column py-0 px-2">
        <Button size="sm" className="mb-1">Profile</Button>
        <Button size="sm" onClick={logout}>Logout</Button>
      </Container>
    </Container>
  )
}

export default UserPanelProfile