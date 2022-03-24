import { Form, Button } from 'react-bootstrap'

const UserCreate = () => {
  return (
    <Form id="user_create">
      <h3 className="mb-5">Create User Account</h3>
      <h5 className="mb-3">Username and Password</h5>
      <Form.Group className="form-group form-group-first">
        <Form.Label column="sm">Username</Form.Label>
        <Form.Control name="username" type="text" size="sm" placeholder="Username" />
        <Form.Text className="text-muted">Your username can consist of maximum of 30 characters, only letters, numbers and underscores are allowed</Form.Text>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label column="sm">Password</Form.Label>
        <Form.Control name="password" type="password" size="sm" placeholder="Password" />
        <Form.Text className="text-muted">Your password can consist of maximum of 30 characters, all are allowed</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form-group form-group-last">
        <Form.Label column="sm">Re-Type Password</Form.Label>
        <Form.Control name="password_" type="password" size="sm" placeholder="Re-Type Password" />
        <Form.Text className="text-muted">Move on by re-typing your password here</Form.Text>
      </Form.Group>

      <h5 className="mb-2">Name and Email</h5>
      <Form.Group className="form-group form-group-first">
        <Form.Label column="sm">First Name</Form.Label>
        <Form.Control name="first_name" type="text" size="sm" placeholder="First Name" />
        <Form.Text className="text-muted">Enter your first name</Form.Text>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label column="sm">Last Name</Form.Label>
        <Form.Control name="last_name" type="text" size="sm" placeholder="Last Name" />
        <Form.Text className="text-muted">Enter your last name</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form-group form-group-last">
        <Form.Label column="sm">Email address</Form.Label>
        <Form.Control name="email" type="text" size="sm" placeholder="Email Address" />
        <Form.Text className="text-muted">Enter your email address</Form.Text>
      </Form.Group>

      <h5 className="mb-2">Address</h5>
      <Form.Group className="form-group form-group-first">
        <Form.Label column="sm">Streetname and Number</Form.Label>
        <Form.Control name="address" type="text" size="sm" placeholder="Street Name and Number" />
        <Form.Text className="text-muted">Enter the full name of the street you live on, name and number</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form-group form-group-last">
        <Form.Label column="sm">Postal Code</Form.Label>
        <Form.Control name="postal_code" type="text" size="sm" placeholder="Postal Code" />
        <Form.Text className="text-muted">Enter you postal code</Form.Text>
      </Form.Group>

      <h5 className="mb-2">Phone Numbers</h5>
      <Form.Group className="form-group form-group-first">
        <Form.Label column="sm">Phone Number Home</Form.Label>
        <Form.Control name="phone_home" type="text" size="sm" placeholder="Phone Number Home" />
        <Form.Text className="text-muted">Enter your home phone number</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form-group form-group-last">
        <Form.Label column="sm">Phone Number Mobile</Form.Label>
        <Form.Control name="phone_mobile" type="text" size="sm" placeholder="Phone Number Mobile" />
        <Form.Text className="text-muted">Enter you mobile phone number</Form.Text>
      </Form.Group>

      <h5 className="mb-2">Geographical Data</h5>
      <Form.Group className="form-group form-group-first">
        <Form.Label column="sm">Continent</Form.Label>
        <Form.Control name="continent" type="text" size="sm" placeholder="Continent" />
        <Form.Text className="text-muted">What continent do you live on?</Form.Text>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label column="sm">Country</Form.Label>
        <Form.Control name="country" type="text" size="sm" placeholder="Country" />
        <Form.Text className="text-muted">Which country do you live in?</Form.Text>
      </Form.Group>
      <Form.Group className="form-group form-group">
        <Form.Label column="sm">Countye</Form.Label>
        <Form.Control name="county" type="text" size="sm" placeholder="County" />
        <Form.Text className="text-muted">In what county?</Form.Text>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label column="sm">City</Form.Label>
        <Form.Control name="city" type="text" size="sm" placeholder="City" />
        <Form.Text className="text-muted">In what city do you live?</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form-group form-group-last">
        <Form.Label column="sm">Timezone</Form.Label>
        <Form.Control name="timezone" type="text" size="sm" placeholder="Timezone" />
        <Form.Text className="text-muted">Select your timezone</Form.Text>
      </Form.Group>

      <Form.Group className="d-flex flex-row-reverse">
        <Button type="button">Confirm</Button>
      </Form.Group>
    </Form>
  )
}

export default UserCreate