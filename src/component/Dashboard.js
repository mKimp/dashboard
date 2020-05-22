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
import './Map.css'
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import PieChart from './PieChart'


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            parkLabel: this.props.dataLabel,
            parkSize: this.props.dataSize,
            searchName: this.props.searchName,
            parkVisitors: this.props.visitors,
            coordinate: this.props.coordinates,
            coodLabell: this.props.coodLabell,
            items: [],
            isLoaded: false,
            totalData: this.props.totaldata,
            lat:0,
            long:0
        })

    }


    render() {

        // console.log(this.state.coodLabell[0].title + "" + this.state.searchName)
        /*       let newArray = []
        const current = this.props.data.filter(function (item) {
                    return item.states[0].title === this.props.searchName
        })
        current.forEach((element) => {
            const title = element.title
            const cood = element.coordinates
            const  newData = {"title": title, "cood": [cood.latitude, cood.longitude]}; 
            newArray.push(newData)

        })
        console.log(newArray[0].cood) */
        

      
 
        const lat = this.state.coodLabell[0].cood[0];
        const long = this.state.coodLabell[0].cood[1];
        const parkLength = this.state.parkLabel.length;

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

            return (
            <React.Fragment>
                <Navigation parkLabel={
                    this.state.parkLabel
                }/>

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
                        <Col md="6">
                            <VisitorChart visitors={visitors}
                                parkLabel={
                                    this.state.parkLabel
                                }
                                searchName={
                                    this.state.searchName
                                }/>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="6"><PieChart parkLength={parkLength}
                                totalData={
                                    this.state.totalData
                                }
                                searchName={
                                    this.state.searchName
                                }/>
                        </Col>
                        
                        <Col md="6">
                            <div id="container">

                                <Map center={
                                        [lat, long]
                                    }
                                    zoom={6}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> {
                                    this.state.coodLabell.map((item) => <Marker key={
                                            item.title
                                        }
                                        position={
                                            [
                                                item.cood[0], item.cood[1]
                                            ]
                                    }>
                                        <Popup position={
                                            [
                                                item.cood[0], item.cood[1]
                                            ]
                                        }>
                                            <div>
                                                <h2> {
                                                    item.title
                                                }</h2>
                                                <h2> {
                                                    item.description
                                                }</h2>
                                            </div>
                                        </Popup>
                                    </Marker>)
                                } </Map>

                            </div>
                        </Col>
                    </Row>


                </Container>
            </React.Fragment>) 
        } 
        
    
    


    


}

export default DashBoard
