import React from 'react';
import Chart from './Chart';
import Navigation from './NavigationBar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App';
import HomePage from './Home';
import { Container } from 'react-bootstrap';
import { Col, Row, Form } from "react-bootstrap";
import VisitorChart from './VisitorsChart'
class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            parkLabel: this.props.dataLabel,
            parkSize: this.props.dataSize,
            searchName:this.props.searchName,
            parkVisitors: this.props.visitors
        })
    }
    render() {
        const parkData = new Array(this.state.parkSize.length)    
        for (let i = 0; i < this.state.parkSize.length; ++i){
            const comma = this.state.parkSize[i].replace(/,/g,'');
            const result = parseFloat(comma)
            parkData[i] = result;
        }
        const visitors = new Array(this.state.parkVisitors.length)    
        for (let i = 0; i < this.state.parkVisitors.length; ++i){
            const comma = this.state.parkVisitors[i].replace(/,/g,'');
            const result = parseInt(comma)
            visitors[i] = result;
        }

        return (
            <React.Fragment>
            <Navigation />
            <Container>
                <Row>
                    <Col md="7"> <Chart parkLabel={this.state.parkLabel} parkSize={parkData} searchName={this.state.searchName} visitors={this.state.parkVisitors}/> </Col>
                </Row>
                <Row>
                    <Col md="7"> <VisitorChart parkLabel={this.state.parkLabel} searchName={this.state.searchName} visitors={visitors}/> </Col>
                </Row>
            </Container>

            </React.Fragment>
        )
  
        
    }


}

export default DashBoard
