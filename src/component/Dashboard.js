import React from 'react';
import Chart from './Chart';
import Navigation from './NavigationBar'
import NavigationNoSearch from './NavigationNoSearch'

import {Container} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";
import VisitorChart from './VisitorsChart'
import './Map.css'
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import PieChart from './PieChart'
import Park from './Park';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

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
            isSearched: false,
            totalData: this.props.totaldata,
            searchText:'',
            isLoaded: false,

        })
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)

    }
    handleTextChange(text) {
        const text1 = text.charAt(0).toUpperCase() + text.slice(1);

        this.setState({searchText: text1})
    }
    handleSubmit(e) {
        this.setState({isSearched:true})

    }
    handleSearchChange (){
        this.setState({isSearched:false})
    }
    
    /*
    componentDidMount() {
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.searchText + "&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
        }, (error) => {
            this.setState({isLoaded: true, error})
        })
    }*/
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

        const {error, isLoaded, items} = this.state;

        if (!this.state.isSearched){
        return (
            <React.Fragment>
                <div>
                <Navigation  textChange={
                            this.state.searchText
                        }
                        onTextChange={
                            this.handleTextChange
                        }
                        onSubmitChange={
                            this.handleSubmit
                        }/>
                </div>
                <div style={{"backgroundColor":"DarkOliveGreen", "display": "flex", "justifyContent":"center", "alignItems":"center"}}>
                <Container>
                    <Row>
                        <Col>
                        <Card style={{'marginTop':'20px'}}>
                            <Card.Header> <b> {this.state.searchName} {"National Parks"} </b> </Card.Header>
                            <Card.Body>
                            {<Chart parkLabel={this.state.parkLabel}
                                parkSize={parkData}
                                searchName={this.state.searchName}/>}

                            </Card.Body>
                        </Card>

                        </Col>
                        <Col>
                        <Card style={{'marginTop':'20px'}}>
                            <Card.Header> <b>Compare to the total of US National Parks </b> </Card.Header>
                            <Card.Body>
                            <PieChart parkLength={parkLength}
                                totalData={this.state.totalData}
                                searchName={this.state.searchName}/>
                           
                            </Card.Body>
                        </Card>
                       
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Card style={{'marginTop':'20px', 'height':'340px'}}>
                            <Card.Header> <b> Amount of Visitors </b></Card.Header>
                            <Card.Body>
                            <VisitorChart visitors={visitors}
                                parkLabel={this.state.parkLabel}
                                searchName={this.state.searchName}/>
                            </Card.Body>
                        </Card>
                           
                        </Col>
                        <Col>
                                <Map center={[lat, long]} zoom={6}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> {
                                    this.state.coodLabell.map((item) => 
                                    <Marker key={item.title}
                                        position={
                                            [
                                                item.cood[0], item.cood[1]
                                            ]}>
                                    <Popup position={
                                            [
                                                item.cood[0], item.cood[1]
                                            ]}>
                                        <div>
                                            <h4> { item.title }</h4>
                                            <p><b> Description </b>: {item.description}}</p>
                                            <p> <b>Established</b>: {item.established}</p>
                                        </div>
                                    </Popup>
                                    </Marker>)} 
                                </Map>                     
                        </Col>
                    </Row>
                </Container>
                </div>
                <footer style={{"backgroundColor": "whitesmoke", "textAlign":"center"}}>
                    <p>Author: Kim Ma</p>
                    <p><a href="mailto:pkm@pdx.edu">pkm@pdx.edu</a></p>
                </footer>
            </React.Fragment>
            )} 
    else{

        return(
            <React.Fragment>
              
            <NavigationNoSearch  
                    onSearchChange={
                        this.handleSearchChange} />

            <Park text={this.state.searchText} />

       </React.Fragment>
    )
    }
    

    }
    


}

export default DashBoard
