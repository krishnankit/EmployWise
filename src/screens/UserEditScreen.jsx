import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button} from "react-bootstrap"
import { toast } from "react-toastify"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { FORM as FORM_CONSTANTS, URLS } from "../../constants"

const UserEditScreen = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const { EMAIL, FIRST_NAME, LAST_NAME } = FORM_CONSTANTS
  const [formData, setFormData] = useState({
    [EMAIL]: "",
    [FIRST_NAME]: "",
    [LAST_NAME]: ""
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${URLS.USERS}/${id}`)
    .then(res => res.json())
    .then(data => {
      const userData = data.data
      setFormData({
        [EMAIL]: userData.email,
        [FIRST_NAME]: userData.first_name,
        [LAST_NAME]: userData.last_name,
      })
    })
    .catch(error => {
      console.log(error)
      navigate("/")
      toast("Something went wrong")
    })
  }, [])

  function handleChange(e) {
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      })
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function validate(formData) {
    const errors = {};
    if (!formData[EMAIL]) {
      errors[EMAIL] = "Please enter email"
    } else if (!formData[EMAIL].match(emailRegEx)) {
      errors[EMAIL] = "Invalid Email"
    }

    if (!formData[FIRST_NAME]) {
      errors[FIRST_NAME] = "Please enter first name"
    }

    if (!formData[LAST_NAME]) {
      errors[LAST_NAME] = "Please enter last name"
    }

    setErrors(errors);
    return Object.keys(errors).length == 0
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (validate(formData)) {
      setIsLoading(true)
      fetch(
        `${URLS.USERS}/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: formData[EMAIL],
            first_name: formData[FIRST_NAME],
            last_name: formData[LAST_NAME],
          }),
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => res.json())
      .then(() => {
        navigate("/")
        toast.success("Updated successfully")
      })
      .catch(error => {
        console.log(error)
        toast.error("Unable to update")
        setIsLoading(false)
      })
    } else {
      toast.warning("Form invalid")
    }
  }

  return (
    <FormContainer>
      <h1>Edit User</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={formData[EMAIL]}
            onChange={handleChange}
            name={EMAIL}
            className={`${errors[EMAIL] ? "border-danger" : ""}`}
          ></Form.Control>
          <p className="text-danger error-field">{errors[EMAIL]}</p>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={formData[FIRST_NAME]}
            onChange={handleChange}
            name={FIRST_NAME}
            className={`${errors[FIRST_NAME] ? "border-danger" : ""}`}
          ></Form.Control>
          <p className="text-danger error-field">{errors[FIRST_NAME]}</p>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={formData[LAST_NAME]}
            onChange={handleChange}
            name={LAST_NAME}
            className={`${errors[LAST_NAME] ? "border-danger" : ""}`}
          ></Form.Control>
          <p className="text-danger error-field">{errors[LAST_NAME]}</p>
        </Form.Group>
        { isLoading && <Loader /> }
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={submitHandler}
        >
          Edit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default UserEditScreen
