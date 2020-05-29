import React from 'react';
import Progress from './ProgressBar'
import Image from 'react-bootstrap/Image'
import {Container} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron'
import AlertDismissibleForPark from './AlertPark'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

class Park extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            items: [],
            isLoaded: false,
            text: this.props.text,
            parkCode: '',
            alerts: [],
            isAlertLoaded: false,
            parkInfo: []
        })
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }
 
    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const key = "&api_key=" + process.env.REACT_APP_WEATHER_API_KEY
        const park_key = "&stateCode=&q=&api_key=" + process.env.REACT_APP_WEATHER_API_KEY
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + key
        fetch(proxyurl + url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
            const array = this.state.items.filter((item) => item.name === this.state.text)
            const code = array[0].parkCode
            this.setState({parkInfo: array})
            let url_alert = "https://developer.nps.gov/api/v1/alerts?parkCode=" + code + park_key
            fetch(proxyurl + url_alert).then(res => res.json()).then((result) => {
                this.setState({isAlertLoaded: true, alerts: result.data, parkCode: code})
            }).catch(error => {
                this.setState({isAlertLoaded: true, error})
            })
        }).catch(error => {
            this.setState({isLoaded: true, error})
        })
    }
    handleSearchChange() {
        this.props.onSearchChange();
    }
    render() { 
        const {error, isLoaded, items} = this.state;
        const {errorA, isAlertLoaded, alerts} = this.state;
        if (error) {
            return (
                <AlertDismissibleForPark onSearchChange={
                        this.handleSearchChange
                    }
                    message={"You could misspell the park name?"}/>
            ) 
        } else if (!isLoaded) {
            return (
                <Progress/>)
        } else { 
            if (!isAlertLoaded) {
                return (
                    <Progress/>)
            }
            const alerts = this.state.alerts
            const park = this.state.parkInfo
            const images1 = park[0].images;
            let images = []
            if (images1.length > 3) {
                images = images1.slice(0, 3)
            } else {
                images = images1
            }

            const fee = park[0].entranceFees[0]

            return (
                <React.Fragment>
                    <div style={{'padding': '15px'}}>
                        <div style={
                            {
                                "display": "flex",
                                'flexWrap': 'wrap',
                                'flexDirection': 'row',
                                'justifyContent': 'space-evenly',
                                'backgroundColor': 'white',
                            }
                        }>
                        {
                            images.map((item) => {
                                return <Image style={
                                        {
                                            height: '230px',
                                            width: '320px',
                                            paddingBottom: '15px'
                                        }
                                    }
                                    src={
                                        item.url
                                    }
                                    rounded/>
                        })
                        } </div>


                        <div style={
                            {
                                "display": "flex",
                                'flexWrap': 'wrap',
                                'flexDirection': 'row',
                                'padding': '15px',
                                'justifyContent': 'center',
                      
                            }
                        }>
                            <Row>
                                <Col>
                                    <Jumbotron style={
                                        {
                                            'marginTop': '20px',
                                            'justifyContent': 'center'
                                        }
                                    }>
                                        <Container>
                                            <h1>{
                                                park[0].fullName
                                            }</h1>
                                            <p> {
                                                park[0].description
                                            } </p>
                                            <Alert variant="warning">
                                                <Alert.Heading>ALerts</Alert.Heading>
                                                <ul> {
                                                    this.state.alerts.map((item) => {
                                                        return <li>{
                                                            item.description
                                                        }</li>
                                                })
                                                } </ul>

                                            </Alert>
                                            <Card style={
                                                {'marginTop': '20px'}
                                            }>
                                                <Card.Header>
                                                    <b>Information</b>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div>
                                                        <p>
                                                            <b>Address
                                                            </b>: {
                                                            park[0].addresses[0].line1
                                                        }, {
                                                            park[0].addresses[0].stateCode
                                                        }, {
                                                            park[0].addresses[0].postalCode
                                                        }</p>
                                                        <p>
                                                            <b>Fee</b>: ${
                                                            fee.cost
                                                        }. {
                                                            fee.description
                                                        } </p>

                                                        <p>
                                                            <b>Operating Hours
                                                            </b>: {
                                                            park[0].operatingHours[0].description
                                                        }</p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <Card style={
                                                {'marginTop': '20px'}
                                            }>
                                                <Card.Header>
                                                    <b>Weather</b>
                                                </Card.Header>
                                                <Card.Body> {
                                                    park[0].weatherInfo
                                                } </Card.Body>
                                            </Card>
                                        </Container>
                                    </Jumbotron>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Park;
