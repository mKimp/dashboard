import React from 'react';
import Chart from './Chart';
import {Modal, ModalBody, Button} from 'react-bootstrap'
import Progress from './ProgressBar'
import Image from 'react-bootstrap/Image'
import {Container} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron'

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
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + "&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
            const array = this.state.items.filter((item) => item.name === this.state.text)
            const code = array[0].parkCode
            this.setState({parkInfo: array})
            let url_alert = "https://developer.nps.gov/api/v1/alerts?parkCode=" + code + "&stateCode=&q=&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
            fetch(url_alert).then(res => res.json()).then((result) => {
                this.setState({isAlertLoaded: true, alerts: result.data, parkCode: code})
            }).catch(error => {
                this.setState({isAlertLoaded: true, error})

            })
        }).catch(error => {
            this.setState({isLoaded: true, error})
        })
    }
    toggleModal() {

        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
        document.getElementById("mySearchForm").reset()
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
            return <div>Error: {
                error.message
            }</div>
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

            /*   return ( <div> <h1>{alert[0].category} </h1>
                                    <p> {alert[0].title} </p> <p>{alert[0].description} </p>
                     </div>
                     )*/
            return (
                <React.Fragment>

                    <Container>
                        <h1>{
                            park[0].fullName
                        }</h1>
                        <Row>
                            <Col>
                                <img style={
                                        {
                                            height: 'auto',
                                            width: '100%'
                                        }
                                    }
                                    src={
                                        park[0].images[0].url
                                }></img>
                            </Col>
                            <Col>
                                <Jumbotron>
                                    <h1>{
                                        park[0].fullName
                                    }</h1>
                                    <p> {
                                        park[0].description
                                    } </p>
                                </Jumbotron>

                            </Col>
                        </Row>

                    </Container>


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
