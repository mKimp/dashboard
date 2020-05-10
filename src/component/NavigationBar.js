import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="success" >
                <Navbar.Brand href="#home" >DashBoard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <Form.Control type="text" placeholder="Searching A Park..." className=" mr-sm-2"/>
                    <Button type="submit">Submit</Button>
                </Form>
            </Navbar>
        )
    }
}

export default Navigation;
