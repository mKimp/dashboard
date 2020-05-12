import React from 'react';
import Chart from './Chart';
import Navigation from './NavigationBar'
import Mapp from './Map'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App';
import HomePage from './Home';
import {Container} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";
import VisitorChart from './VisitorsChart'
class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            parkLabel: this.props.dataLabel,
            parkSize: this.props.dataSize,
            searchName: this.props.searchName,
            parkVisitors: this.props.visitors,
            coordinate: this.props.coordinates
        })
    }
    render() {
        const parkData = new Array(this.state.parkSize.length)
        for (let i = 0; i < this.state.parkSize.length; ++ i) {
            const comma = this.state.parkSize[i].replace(/,/g, '');
            const result = parseFloat(comma)
            parkData[i] = result;
        }
        const visitors = new Array(this.state.parkVisitors.length)
        for (let i = 0; i < this.state.parkVisitors.length; ++ i) {
            const comma = this.state.parkVisitors[i].replace(/,/g, '');
            const result = parseInt(comma)
            visitors[i] = result;
        }

        console.log(this.state.coordinate)

        return (
            <React.Fragment>
                <Navigation/>
                <Container>
                    <Row>
                        <Col md="6"><Chart parkLabel={
                                    this.state.parkLabel
                                }
                                parkSize={parkData}
                                searchName={
                                    this.state.searchName
                                }/>
                        </Col>
                        <Col>
                            <div id="container">
                                <Mapp coordinates = {this.state.coordinate}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <VisitorChart visitors={visitors}
                                parkLabel={
                                    this.state.parkLabel
                                }
                                searchName={
                                    this.state.searchName
                                }/>
                        </Col>
                        <Col md="6">
                            <div id="container">
                                <Mapp coordinates = {this.state.coordinate}/>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        )


    }


}

export default DashBoard
