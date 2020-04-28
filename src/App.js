import React from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import HomePage from './component/Home'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parks: [],
            isLoaded: false
        }
    }

    async componentDidMount() {

      try{
        const response = await fetch('https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD')
        const json = await response.json();
        this.setState({isLoaded: true, parks: json})
      } catch (error){
          console.log(error);
      }
    }

    render() { 
        if (this.state.isLoaded == true) {
          //  var lat  = this.state.parks.data[0].longtitude;
          //  console.log(lat);
            //console.log(this.state.parks.data[0].latLong);
        } else {
            console.log("NOTHING");
        }
        return (
            <div className="App">
                <React.Fragment>
                    <HomePage />
                </React.Fragment>
            </div>

        );
    }
}



export default App;
