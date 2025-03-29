import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserCard = ({ user, onDelete }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card className="shadow-sm px-2">
      <Card.Img
        variant="top"
        src={user.avatar}
        alt="Avatar"
        className="mx-auto mt-3"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <Card.Body className="text-center">
        <Card.Title
          style={{ whiteSpace: "nowrap", marginBottom: "1rem" }}
        >{user.firstName} {user.lastName}</Card.Title>
        <Row>
          <Col>
            <Link
              to={`/users/edit/${user.id}`}
              variant="primary"
              className="mt-5"
            >Edit</Link>
          </Col>
          <Col>
            <button
              onClick={() => onDelete(user.id)}
              className="text-danger underline"
              style={{
                border: "none",
                background: "none",
              }}
            ><u>Delete</u></button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

export default UserCard
