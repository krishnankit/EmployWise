import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import UserCard from "../components/UserCard"
import { URLS } from "../../constants";
import { toast } from "react-toastify";

function UsersScreen() {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [pageList, setPageList] = useState([])
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {
    fetch(`${URLS.USERS}?page=${activePage}`)
    .then(res => res.json())
    .then(data => {
      const users = []
      setTotalPages(data.total_pages)
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
  }, [activePage])

  // Effect for pagination
  useEffect(() => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => setActivePage(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }

    setPageList(pages)
  }, [users])

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
      <Pagination>{pageList}</Pagination>
    </Container>
  );
}

export default UsersScreen;
