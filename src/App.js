import React from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import HomePage from './component/Home'

class App extends React.Component {

    render(){
        return (
            <HomePage />
        )
    }


/*
    constructor(props) {
        super(props);
        this.state = {
            stateSearch: "",
            url: 'https://developer.nps.gov/api/v1/parks?stateCode=',
            key: '&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD',
            parks: [],
            isLoaded: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);

    }
    handleNameChange(stateName) {
        this.setState({stateSearch: stateName})

    }
    handleSubmitChange(stateName) {
        this.setState({stateSearch: stateName})
    }

    async componentDidMount (){
        const search_url = this.state.url + this.state.stateSearch + this.state.key;
        console.log(search_url);
        try { // const response = await fetch('https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD')
            const response = await fetch(search_url);

            const json = await response.json();
            this.setState({isLoaded: true, parks: json})
        } catch (error) {
            console.log(error);
        }
    }

    render() {
/*
        const parks = this.state.parks;
        const isLoaded = this.state.isLoaded;
        const stateSearch = this.state.stateSearch;
        if (isLoaded == true) {
            //var lat  = this.state.parks.data[0].longtitude;
            //console.log(lat);
            console.log(this.state.parks.data[0].latLong);
        } else {
          console.log("NOTHING");
         } 
        return (
            <div className="App">
                <h1>Hello</h1>
                <HomePage stateSearch={stateSearch}
                    onNameChange={
                        this.handleNameChange
                    }
                    onNameSubmit={
                        this.handleSubmitChange
                    }/>
            </div>
        return (
            <div>
                    <h1>DashBoard</h1>

            </div>
        );
    }*/
}


export default App;
