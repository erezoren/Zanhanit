import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from "react";
import {Logo} from "./Logo";
import {useUser} from "@auth0/nextjs-auth0";
import Profile from "./Profile";

export const Header = (props) => {

  const [date, setDate] = useState(new Date().toString());
  const {user} = useUser();

  setInterval(() => {
    setDate(new Date().toString())
  }, 1000)

  return (
      <div dir={"rtl"}>
        <Navbar expand="lg" dir={"rtl"} >
          <Container>
            <Navbar.Brand href="#home">פאב הצנחנית - להבות חביבה</Navbar.Brand>
            <Navbar.Toggle><Logo/></Navbar.Toggle>
            {user && <Profile/>}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">בית</Nav.Link>
                <Nav.Link href="/tickets">כרטיסים</Nav.Link>
                <Nav.Link href="/pictures">תמונות</Nav.Link>
                <Nav.Link href="/events">אירועים</Nav.Link>
                <Nav.Link href="/protocols">נהלים</Nav.Link>
                <Nav.Link href="/admin">ניהול</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <p>{date}</p>
        <hr/>
      </div>

  )
}