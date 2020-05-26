import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Park from './Park';

class NavigationNoSearch extends React.Component {
    constructor(props){
        super(props)
        this.resetPage = this.resetPage.bind(this);

    }
    resetPage(){
        this.props.onSearchChange();
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="success" >
                <Navbar.Brand href="/" >DashBoard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link onClick={this.resetPage}>Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )

    }
}

export default NavigationNoSearch;
