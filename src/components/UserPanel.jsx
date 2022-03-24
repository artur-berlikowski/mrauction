import { Link } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'

const UserPanel = (props) => {
  let { username, password } = props

  async function signIn(event) {
    event.preventDefault()
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    let response = await (await fetch('http://localhost:3001/user/auth', requestOptions)).json()
    console.log(response)
  }

  return (
    <Container id="user_panel" fluid className="d-flex flex-row-reverse m-0 p-0">
      <Link to="/user/register"><Button type="button" className="btn btn-primary btn-sm text-center">Register</Button></Link>
      <Button type="button" className="btn btn-primary btn-sm text-center mx-1" onClick={signIn}>Sign In</Button>
    </Container>
  )
}

export default UserPanel