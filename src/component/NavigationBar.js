import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './Nav.css'

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            isLoaded: false,
            items: [],
            isSearch: false
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetPage = this.resetPage.bind(this);

    }
    handleTextChange(e) {
        const text1 = e.target.value 
        const array_text = text1.split(" ");
        const search = ',';
        const searchRegExp = new RegExp(search, 'g')
        const pre_result = array_text.map((item) => {let x = item.charAt(0).toUpperCase(); let y = x + item.slice(1); return y})
        let result = pre_result.join();      
        console.log(result.replace(searchRegExp, " "))
        this.props.onTextChange(result.replace(searchRegExp, " "))
    }

    handleSubmit(e) {
        e.preventDefault()
        document.getElementById("mySearchForm").reset()

        this.props.onSubmitChange();
    }

    resetPage() {
        document.getElementById("mySearchForm").reset()
        this.props.onSearchChange();
    }
    render() {
        return (
            <Navbar expand="lg" id="navbarr">
                <Navbar.Brand> <a className="navbar-brand" href="/"><img src=
                {"data:image/jpeg;base64,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"} 
                width="70px" alt="logo"></img></a>DashBoard NATIONAL PARKS </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/"></Nav.Link>
                    </Nav>
                    <Form inline onSubmit={this.handleSubmit} id="mySearchForm">
                    <Form.Control type="text" placeholder="Searching A Park ..." className=" mr-sm-2" onChange={
                                    this.handleTextChange
                                }/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button> 
                </Form> 
                </Navbar.Collapse>
            </Navbar>
        )

    }
}

export default Navigation;
