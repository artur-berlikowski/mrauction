import { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const UserProfile = (props) => {
  let { name } = props
  let initialProfileData = Object.freeze({
    name: '',
    email: '',
    fisrt_name: '',
    last_name: '',
    country: '',
    county: '',
    city: '',
    phone_mobile: '',
    timezone: ''
  })

  const [profile, setProfile] = useState(initialProfileData)

  useEffect(async () => {
    let result = await (await fetch('http://localhost:3001/user/profile', { method: 'GET', credentials: 'include' })).json()
    setProfile(result.data.profile)
  }, [])

  return (
    <>
      <Row id="user_profile">
        <Col className='d-flex flex-row'>
          <div id="user_profile_picture"></div>
          <Container className="d-flex flex-column">
            <h2>{profile.name}</h2>
            <span>{profile.first_name && profile.last_name && (profile.firts_name + ' ' + profile.last_name)}</span>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default UserProfile