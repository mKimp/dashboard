import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css'

//When the app is loaded at the first time
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleTextChange(e) {
        const text1 = e.target.value 
        const array_text = text1.split(' ');
        const pre_result = array_text.map((item) => {let x = item.charAt(0).toUpperCase(); let y = x + item.slice(1); return y})
        let result = pre_result.join();      
        this.props.onTextChange(result.replace(",", " "));
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmitChange();
    }

    //handle the submit on the form
    render() { 
        return (
            <React.Fragment>
                <div className="Home">
                    <h1 className="text-center">National Parks DashBoard </h1>
                    <Form onSubmit={
                        this.handleSubmit
                    }>
                        <Form.Group controlId="my-form">
                            <Form.Control type="text" placeholder="Enter the state name ... "
                                onChange={
                                    this.handleTextChange
                                }
                                required/>
                            <h2 style={{"fontSize": "15px"}}> <b> Eg: Type in 'Oregon' </b></h2>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;
