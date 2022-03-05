import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {dateStamp} from "../lib/common_utils";
import {useState} from "react";

export const Header = (props) => {

  const [date,setDate] = useState(new Date().toString())

  setInterval(()=>{
    setDate(new Date().toString())
  },1000)

  return (
      <div>
        <Navbar bg="light" expand="lg" dir={"rtl"}>
          <Container>

            <Navbar.Brand href="#home">פאב הצנחנית</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">בית</Nav.Link>
                <Nav.Link href="/tickets">כרטיסים</Nav.Link>
                <Nav.Link href="#link">אירועים</Nav.Link>
                <Nav.Link href="#link">נהלים</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <p>{date}</p>
        <hr/>
      </div>

  )
}