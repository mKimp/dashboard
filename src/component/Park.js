import React from 'react';
import Progress from './ProgressBar'
import {Col, Row} from "react-bootstrap";
import AlertDismissibleForPark from './AlertPark'
import Carousel from 'react-bootstrap/Carousel'
import Jumbo from './Jumbotron'

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
        const key = "&api_key=" + process.env.REACT_APP_WEATHER_API_KEY
        const park_key = "&stateCode=&q=&api_key=" + process.env.REACT_APP_WEATHER_API_KEY
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + key
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
            const array = this.state.items.filter((item) => item.name === this.state.text)
            const code = array[0].parkCode
            this.setState({parkInfo: array})
            let url_alert = "https://developer.nps.gov/api/v1/alerts?parkCode=" + code + park_key
            fetch(url_alert).then(res => res.json()).then((result) => {
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
        const {error, isLoaded} = this.state;
        const {isAlertLoaded} = this.state;
        if (error) {
            return (
                <AlertDismissibleForPark onSearchChange={
                        this.handleSearchChange
                    }
                    message={"You could misspell the park name?"}/>
            ) 
        } else if (!isLoaded) {
            return (<Progress/>)
        } else { 
            if (!isAlertLoaded) {
                return (<Progress/>)
            }
            const park = this.state.parkInfo
            const images1 = park[0].images;
            let images = []
            if (images1.length > 3) {
                images = images1.slice(0, 3)
            } else {
                images = images1
            }
            const fee = park[0].entranceFees[0]
            if (images.length < 3){
                if (images.length === 1){
                    return ( <React.Fragment>
                        <div style={{'padding': '15px'}}>
                            <div>
                        <Carousel>
      
                            <Carousel.Item>
                        {                                
                        <img className="d-block w-100" alt="park"
                        style={{
                        'height': '650px',
                        }}
                        src={
                        images[0].url
                        }
                        />} 
                        </Carousel.Item> 
                        </Carousel> </div>
                        <div>
                            <Row>
                                <Col>
                                    <Jumbo alerts = {this.state.alerts}
                                    park={park}
                                    fee = {fee} />
                                  
                                </Col>
                            </Row>
                        </div>
                    </div>
                </React.Fragment>
            )}
            else{
                return ( <React.Fragment>
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
                        <Carousel>  
                        <Carousel.Item>
                        {                                
                            <img className="d-block w-100" alt="park"
                            style={{
                            'height': '650px',
                            }}
                            src={
                            images[0].url
                            }
                            />
                        })
                        } </Carousel.Item>
                        <Carousel.Item>
                        {                                
                            <img className="d-block w-100" alt="park"
                            style={{
                            'height': '650px',
                            }}
                            src={
                            images[1].url
                            }
                            />
                        })
                        } </Carousel.Item>
                        </Carousel> </div>
                        <div>
                            <Row>
                                <Col>
                                <Jumbo alerts = {this.state.alerts}
                                    park={park}
                                    fee = {fee} />
                                </Col>
                            </Row>

                        </div>
                    </div>
                </React.Fragment>
            )}
            }
            else{
            return (
                <React.Fragment>
                    <div style={{'padding': '15px'}}>
                        <div>
                        <Carousel>
                        <Carousel.Item>
                        {                                
                            <img className="d-block w-100" alt="park"
                                    style={{
                                        'height': '650px',
                                    }}
                                    src={
                                        images[0].url
                                    }
                            />
                        } 
                        </Carousel.Item>
                        <Carousel.Item>
                        {    
                            <img className="d-block w-100" alt="park"
                            style={{
                            'height': '650px',
                        }}   
                            src={   
                                images[1].url
                            }
                            />
                        } 
                        </Carousel.Item>
                        <Carousel.Item>
                        {   
                            <img className="d-block w-100" alt="park"
                            style={{
                            'height': '650px',
                            }}   
                            src={
                                images[2].url
                            }
                            />
                        } 
                        </Carousel.Item>
                        </Carousel> 
                    </div>
                    <div>
                            <Row>
                                <Col>
                                <Jumbo alerts = {this.state.alerts}
                                    park={park}
                                    fee = {fee} />
                                </Col>
                            </Row>
                    </div>
                </div>
            </React.Fragment>
        )}
    }
    }
}

export default Park;
