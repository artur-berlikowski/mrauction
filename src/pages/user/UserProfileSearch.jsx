import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const UserProfile = () => {
  let { name } = useParams()
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    first_name: '',
    last_name: '',
    country: '',
    county: '',
    city: '',
    timezone: ''
  })
  const [profileExists, setProfileExists] = useState(false)

  useEffect(async () => {
    let result = await (await fetch(`http://localhost:3001/user/profile/${name}`)).json()
    if (result.error) {
      setProfileExists(false)
    } else if (result.data) {
      setProfileExists(true)
      setProfileData(result.data)
    }
  }, [])

  return (
    <div id="user_profile">
      <h2>User Profile</h2>
      {profileExists &&
        <Container>
          <h4>Username: {name}</h4>
          <h4>Full Name: {profileData.first_name && profile_data.last_name || <span className="text-muted">Not Specified</span>}</h4>
          <h4>Location: {profileData.country && profileData.county && profileData.city || <span className="text-muted">Not Specified</span>}</h4>
          <h4>Timezone: {profileData.timezone || <span className="text-muted">Not Specified</span>}</h4>
        </Container>
        ||
        <h3>No user by the name of '{name}' was found</h3>}
    </div>
  )
}

export default UserProfile