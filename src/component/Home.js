import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css'

// When the app is loaded at the first time
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleTextChange(e) {
        const text1 = e.target.value
        const search = ',';
        const searchRegExp = new RegExp(search, 'g')
        const array_text = text1.split(" ");

        if (array_text.length < 3) {
            const pre_result = array_text.map((item) => {
                let x = item.charAt(0).toUpperCase();
                let y = x + item.slice(1);
                return y
            })
            let result = pre_result.join();
            console.log(result.replace(searchRegExp, " "))
            this.props.onTextChange(result.replace(searchRegExp, " "))
        } else { // handle the state District of Columbia (only state has 3 words )
            let i = 0;
            for (i = 0; i < array_text.length; ++i){
                if (i == 0){
                    let x = array_text[i].charAt(0).toUpperCase()
                    array_text[i] = x + array_text[i].slice(1);
                }
                else if (i == 2){
                    let x = array_text[i].charAt(0).toUpperCase()
                    array_text[i] = x + array_text[i].slice(1);
                }
            }
            let result = array_text.join();
            this.props.onTextChange(result.replace(searchRegExp, " "))
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmitChange();
    }

    // handle the submit on the form
    render() {
        return (
            <React.Fragment>
                <div className="Home">
                    <h1 className="text-center">National Parks DashBoard
                    </h1>
                    <Form onSubmit={
                        this.handleSubmit
                    }>
                        <Form.Group controlId="my-form">
                            <Form.Control type="text" placeholder="Enter the state name ... "
                                onChange={
                                    this.handleTextChange
                                }
                                required/>
                            <h2 style={
                                {"fontSize": "15px"}
                            }>
                                <b>
                                    Eg: Type in 'Oregon'
                                </b>
                            </h2>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;
