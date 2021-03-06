import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <div>
      <Navbar bg="info" expand="lg" collapseOnSelect variant="dark">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="#">ANI KUTUSU</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav>
                <LinkContainer to="/create">
                    <Nav.Link>
                        <Button variant="outline-success">Bir Anı Paylaş</Button>
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
