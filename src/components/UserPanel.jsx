import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Container, Button } from 'react-bootstrap'
import UserPanelLogin from './UserPanelLogin'

const UserPanel = (props) => {
  let { loggedIn } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate()

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
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    let response = await (await fetch('http://localhost:3001/auth', requestOptions)).json()
    document.location.reload(response.data)
  }

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
    <div id="user-panel">
      {loggedIn && <Button type="button" onClick={logout}>Log Out</Button> || <UserPanelLogin />}
    </div>
  )
}

export default UserPanel