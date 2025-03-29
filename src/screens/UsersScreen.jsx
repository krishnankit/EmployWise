import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import UserCard from "../components/UserCard"
import { URLS } from "../../constants";
import { toast } from "react-toastify";

function UsersScreen() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${URLS.USERS}?page=1`)
    .then(res => res.json())
    .then(data => {
      const users = []
      data.data.forEach(user => {
        users.push({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        })
      })
      setUsers(users)
    })
    .catch(error => {
      console.log(error)
      alert("Unable to fetch users")
    })
  }, [])

  function handleDelete(userId) {
    fetch(
      `${URLS.USERS}/${userId}`,
      {
        method: "delete"
      }
    )
    .then(res => {
      toast.success("User deleted")
      setUsers(users => {
        return users.filter(user => user.id != userId)
      })
    })
    .catch(error => {
      console.log(error)
      toast.error("Unable to delete user")
    })
  }

  return (
    <Container className="mt-4">
      <Row>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </Row>
    </Container>
  );
}

export default UsersScreen;
