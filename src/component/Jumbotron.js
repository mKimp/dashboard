import React from 'react';
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import {Container} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'

//this componenet is used multiple times in the park.js, so I make it as a component to make things clean. Show the information about the park
class Jumbo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            alerts: this.props.alerts,
            fee: this.props.fee,
            park: this.props.park
        }
    }
    render(){
        
        const park = this.state.park;
        const fee = this.state.fee;
        return(  <Jumbotron style={
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
        </Jumbotron>)
    }
}

export default Jumbo