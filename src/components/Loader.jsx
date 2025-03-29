import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      type="status"
      style={{
        width: "60px",
        height: "60px",
        display: "block",
        margin: "auto"
      }}
    ></Spinner>
  )
}

export default Loader
