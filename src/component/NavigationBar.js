import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Park from './Park';

class Navigation extends React.Component {
    constructor(props){
        super(props)
        this.state = {text:'', isLoaded:false, items:[], isSearch:false}
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetPage = this.resetPage.bind(this);

    }
    handleTextChange(e) {
        this.props.onTextChange(e.target.value);
      //  this.setState({text:e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        document.getElementById("mySearchForm").reset()

        this.props.onSubmitChange();
     //this.setState({isSearch:true})
    }

    resetPage(){
        document.getElementById("mySearchForm").reset()
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
                <Form inline onSubmit={this.handleSubmit} id="mySearchForm">
                    <Form.Control type="text" placeholder="Searching A Park Information during COVID-19" className=" mr-sm-2" onChange={
                                    this.handleTextChange
                                }/>
                    <Button type="submit">Submit</Button> 
                    
                </Form> 
            </Navbar>
        )

    }
}

export default Navigation;
