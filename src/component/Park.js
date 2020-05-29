import React from 'react';
import Chart from './Chart';
import {Modal, ModalBody, Button} from 'react-bootstrap'
import Progress from './ProgressBar'
import Image from 'react-bootstrap/Image'
import {Container} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron'
import AlertDismissibleForPark from './AlertPark'
import ControlledCarousel from './Carousels'
import ImageGallery from 'react-image-gallery';
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
            modalIsOpen: true,
            parkInfo: []
        })
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.expandImage = this.expandImage.bind(this)
    }
    /*
    componentDidMount() {
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + "&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
        }, (error) => {
            this.setState({isLoaded: true, error})
        })
    } */
    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + "&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(proxyurl + url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
            const array = this.state.items.filter((item) => item.name === this.state.text)
            const code = array[0].parkCode
            this.setState({parkInfo: array})
            let url_alert = "https://developer.nps.gov/api/v1/alerts?parkCode=" + code + "&stateCode=&q=&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
            fetch(proxyurl + url_alert).then(res => res.json()).then((result) => {
                this.setState({isAlertLoaded: true, alerts: result.data, parkCode: code})
            }).catch(error => {
                this.setState({isAlertLoaded: true, error})

            })
        }).catch(error => {
            this.setState({isLoaded: true, error})
        })
    }
    expandImage(imgs) {
        var expandImg = document.getElementById("expandedImg");
        expandImg.src = imgs.src;
        // expandImg.parentElement.style.display = "block";
    }
    toggleModal() {

        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }
    handleSearchChange() {
        this.props.onSearchChange();
    }
    /*
    fetchParkCode(code){
        let url = "https://developer.nps.gov/api/v1/alerts?parkCode="+ code + "&stateCode=&q=&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isAlertLoaded: true, alerts: result.data})
        }, (error) => {
            this.setState({isAlertLoaded: true, error})
        })
    }*/
    render() { // console.log(this.state.text)
        const {error, isLoaded, items} = this.state;
        const {errorA, isAlertLoaded, alerts} = this.state;
        if (error) {
            return (
                <AlertDismissibleForPark onSearchChange={
                        this.handleSearchChange
                    }
                    message={"You could misspell the park name?"}/>
            ) // <div>Error: You could misspell the park name </div>
        } else if (!isLoaded) {
            return (
                <Progress/>)
        } else { /*
                    const array = this.state.items.filter((item)=> item.name === this.state.text )
                    const code = array[0].parkCode
                    this.fetchParkCode(code)
                 */
            if (!isAlertLoaded) {
                return (
                    <Progress/>)
            }
            /*
                    else{*/
            // console.log(this.state.alerts)
            const alerts = this.state.alerts
            const park = this.state.parkInfo
            console.log(this.state.parkInfo)
            console.log(this.state.alerts)
            const images1 = park[0].images;
            let images = []
            if (images1.length > 3) {
                images = images1.slice(0, 3)
            } else {
                images = images1
            }
            console.log(images)
            const hours = park[0].operatingHours.map((item) => {
                return item.standardHours
            })
            console.log(hours[0])
            const fee = park[0].entranceFees[0]
            console.log(fee)


            /*   return ( <div> <h1>{alert[0].category} </h1>
                                    <p> {alert[0].title} </p> <p>{alert[0].description} </p>
                     </div>
                     )*/
            return (


                <React.Fragment>
                    <div style={
                        {
                            'padding': '15px'
                        }
                    }>
                        <div style={
                            {
                                "display": "flex",
                                'flexWrap': 'wrap',
                                'flexDirection': 'row',
                                'justifyContent': 'space-evenly',
                                'backgroundColor': 'white'
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
                            'justifyContent': 'space-evenly',
                            'padding': '15px'
                        }
                    }>
                        <Row>
                        <Alert variant="warning">
                                        <Alert.Heading>ALerts</Alert.Heading>
                                        <ul> {this.state.alerts.map((item) => {
                                                return <li>{
                                                    item.description
                                                }</li>})}
                                        </ul>
               
                                    </Alert>

                        </Row>
                        <Row>
                            <Col>
                                <Jumbotron style={
                                    {'marginTop': '20px'}
                                }>
                                    <Container>
                                        <h1>{
                                            park[0].fullName
                                        }</h1>
                                        <p> {
                                            park[0].description
                                        } </p>
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
                                    </Container>
                                </Jumbotron>
                            </Col>
                            <Col>
                                <Col>
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
                                </Col>
                               

                            </Col>


                        </Row>
                    </div>
                </div>

                </React.Fragment>
            )
        }

        // }
    }
}


export default Park;
/*       <Modal show={this.state.modalIsOpen}>
                        <Modal.Header >
                            <Modal.Title>{alert[0].category}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>{alert[0].description}</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.toggleModal} variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal> 
                    <Col> {
                        alerts.map((alert) =>< div > <p>{
                            alert.description
                        } </p>
                        <p>{
                            alert.category
                        }</p>
                        <p>{
                            alert.title
                        }</p>
                        <p>{
                            alert.url
                        }</p>
                    </div>)
                    }
                        <Button variant="primary" type="submit">Back to the DashBoard</Button>
                    </Col>*/
