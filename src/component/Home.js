import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleTextChange(e) {
        this.props.onTextChange(e.target.value);
    }
    
    handleSubmit(e) {
        this.props.onSubmitChange();
    }
      
    render() {
        /*
        return (
          <form onSubmit={
            this.handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={this.props.textChange}
              onChange={this.handleTextChange} required
            />
            <Button variant="primary" type="submit">Submit</Button>          
            </form>
        );*/
        return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh',  backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
    }}>

            <Form  onSubmit={
            this.handleSubmit}>
                <Form.Group controlId="my-form">
                    <h1>Enter The State Name:</h1>
                    <Form.Control type="text" placeholder="Searching" value={this.props.textChange}
              onChange={this.handleTextChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form> 
        </div>)
      }
    }
    

/*
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateName: '',
            isSearch: false,
            url: 'https://developer.nps.gov/api/v1/parks?stateCode=',
            key: '&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD',
            parks: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dashboard = this.dashboard.bind(this);

    }

    handleChange(event) {
        this.setState({stateName: event.target.value})
        // this.props.onNameChange(event.target.value);

    }
    handleSubmit(event) {
        // const temperature = this.state.stateName;
        // this.props.onNameSubmit(temperature);
        event.preventDefault();
        alert(this.state.stateName);

    }

    dashboard() {
        const name = this.state.stateName;
        const capital = name.charAt(0).toUpperCase() + name.slice(1);
        const stateReturn = data.filter((item) => item.states[0].title === capital)
        const parkReturn = stateReturn.map((item) => item.title);
        console.log(parkReturn)
    }

    async handleSubmit(event) {
        // const temperature = this.state.stateName;
        // this.props.onNameSubmit(temperature);
        event.preventDefault();
        this.setState({isSearch: true});
        this.dashboard();
        // const search_url = this.state.url + this.state.stateName + this.state.key;
        /*     try { // const response = await fetch('https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD')
            const response = await fetch( 'data.json')  //'https://developer.nps.gov/api/v1/parks?stateCode='+ this.state.stateName + this.state.key);

            const json = await response.json();
            this.setState({parks: json})
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const stateSearch = this.state.stateSearch;
        const search_url = this.state.url + this.state.stateName + this.state.key;
        console.log("dataset" + this.state.parks);

        return (
            <div> {
                this.state.isSearch == false || this.state.parks == null ? (
                    <form onSubmit={
                        this.handleSubmit
                    }>
                        <div>
                            <label>Name of the state:
                            </label>
                            <input type="text"
                                value={stateSearch}
                                onChange={
                                    this.handleChange
                                }/>
                            <input type="submit" value="submit"/>
                        </div>

                    </form>
                ) : (
                    <div> {
                        this.state.parks.length == 0 ? console.log("WAITING") : <DashBoard /> //console.log("RETRN " + this.state.parks[0])
                    } </div>
                )
            } </div>

        )

    }
}
*/
export default HomePage;
