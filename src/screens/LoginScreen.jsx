import { Form, Button} from "react-bootstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { useAuth } from "../contexts/AuthContext"
import { FORM as FORM_CONSTANTS, URLS } from "../../constants"
import { toast } from "react-toastify"

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useAuth()
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const EMAIL = FORM_CONSTANTS.EMAIL
  const PASSWORD = FORM_CONSTANTS.PASSWORD
  const [formData, setFormData] = useState({
    [EMAIL]: "",
    [PASSWORD]: "",
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [navigate, user])

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
    const errors = [];
    if (!formData[EMAIL]) {
      errors[EMAIL] = "Please enter email"
    } else if (!formData[EMAIL].match(emailRegEx)) {
      errors[EMAIL] = "Invalid Email"
    }

    if (!formData[PASSWORD]) {
      errors[PASSWORD] = "Please enter password"
    }

    setErrors(errors)
    return Object.keys(errors).length == 0
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (validate(formData)) {
      setIsLoading(true)
      fetch(
        URLS.USERS,
        {
          method: "POST",
          body: JSON.stringify({
            email: formData[EMAIL],
            password: formData[PASSWORD]
          }),
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => res.json())
      .then(data => {
        login({ email: data.email, id: data.id})
      })
      .catch(error => {
        // LOGIN DOES NOT FAIL FOR WRON PASSWORDS SO NO NEED TO HANDLE THAT
        console.log(error)
        throw new Error("Unable to login")
      })
    } else {
      toast.warning("Form invalid")
    }
  }

  return (
    <FormContainer>
      <h1>Login</h1>
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
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={formData[PASSWORD]}
            onChange={handleChange}
            name={PASSWORD}
            className={`${errors[PASSWORD] ? "border-danger" : ""}`}
          ></Form.Control>
          <p className="text-danger error-field">{errors[PASSWORD]}</p>
        </Form.Group>
        { isLoading && <Loader /> }
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={submitHandler}
        >
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
