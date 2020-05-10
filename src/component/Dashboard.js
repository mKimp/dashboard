import React from 'react';
import Chart from './Chart';
import Navigation from './NavigationBar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const data = this.props.data; 

        return (
            <React.Fragment>
            <Navigation />
            

            </React.Fragment>
        )
  
        
    }


}

export default DashBoard
