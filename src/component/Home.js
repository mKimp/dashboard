import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css'

// When the app is loaded at the first time
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={usstates: this.props.usstates}
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleTextChange(e) {
        const text1 = e.target.value
        const search = ',';
        const searchRegExp = new RegExp(search, 'g')
        const array_text = text1.split(" ");

        const pre_result = array_text.map((item) => {
            let x = item.charAt(0).toUpperCase();
            let y = x + item.slice(1);
                return y
            })
        let result = pre_result.join();
        console.log(result.replace(searchRegExp, " "))
        this.props.onTextChange(result.replace(searchRegExp, " "))
        
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmitChange();
    }

    // handle the submit on the form
    render() {
        const usstates = this.state.usstates
        return (
            <React.Fragment>
                <div className="Home">
                    <h1 className="text-center">National Parks DashBoard
                    </h1>
                    <div>
            <select id="dropdown" onChange={this.handleTextChange}>
                {usstates.map((item)=><option value={item}>{item}</option>)}
            </select>
          </div>
  <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>

                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;
