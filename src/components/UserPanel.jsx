import UserPanelLogin from './UserPanelLogin'
import UserPanelProfile from './UserPanelProfile'

const UserPanel = (props) => {
  let { loggedIn } = props

  return (
    <div id="user_panel">
      {loggedIn && <UserPanelProfile /> || <UserPanelLogin />}
    </div>
  )
}

export default UserPanel