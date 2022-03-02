import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = (props) => {

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
        <hr/>
      </div>

  )
}