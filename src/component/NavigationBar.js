import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Navigation extends React.Component {
    constructor(props){
        super(props)
        this.state = {parkLabel: this.props.parkLabel}
    }
    render() {

        return (
            <Navbar collapseOnSelect expand="lg" bg="success" >
                <Navbar.Brand href="/" >DashBoard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <Form.Control type="text" placeholder="Searching A Park Information during COVID-19" className=" mr-sm-2"/>
                    <Button type="submit">Submit</Button>
                </Form>
            </Navbar>
        )
    }
}

export default Navigation;
