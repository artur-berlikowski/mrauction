const UserCreated = (props) => {
  let { username, email } = props
  return (
    <div className="text-center">
      <h3>Welcome {username}, your user account has been created!</h3>
      <h4>A confirmation email has been sent to your email <b>{email}</b></h4>
    </div>
  )
}

export default UserCreated