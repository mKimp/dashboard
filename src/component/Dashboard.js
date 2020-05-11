import React from 'react';
import Chart from './Chart';
import Navigation from './NavigationBar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App';
import HomePage from './Home';
import { Container } from 'react-bootstrap';
import { Col, Row, Form } from "react-bootstrap";

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            parkLabel: this.props.dataLabel,
            parkSize: this.props.dataSize,
            searchName:this.props.searchName
        })
    }
    render() {
        const parkData = new Array(this.state.parkSize.length)    
        for (let i = 0; i < this.state.parkSize.length; ++i){
            const comma = this.state.parkSize[i].replace(/,/g,'');
            const result = parseFloat(comma)
            parkData[i] = result;
        }
    
        return (
            <React.Fragment>
            <Navigation />
            <Container>
                <Row>
                    <Col > <Chart parkLabel={this.state.parkLabel} parkSize={parkData} searchName={this.state.searchName}/> </Col>
                    <Col > <Chart parkLabel={this.state.parkLabel} parkSize={parkData}/> </Col>

                </Row>
            </Container>

            </React.Fragment>
        )
  
        
    }


}

export default DashBoard
