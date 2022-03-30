import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const User = () => {
  return (
    <>
      <Container className="px-5 py-4">
        <Outlet />
      </Container>
    </>
  )
}

export default User