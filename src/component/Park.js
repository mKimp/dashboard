import React from 'react';
import Progress from './ProgressBar'
import {Col, Row} from "react-bootstrap";
import AlertDismissibleForPark from './AlertPark'
import Carousel from 'react-bootstrap/Carousel'
import Jumbo from './Jumbotron'

//Displaying information about a park after user is using the "search" bar
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
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + key //fetch the first time to get the park code (unique)
        fetch(url,{'Access-Control-Allow-Origin':'*'}).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
            const array = this.state.items.filter((item) => item.name === this.state.text)
            const code = array[0].parkCode
            this.setState({parkInfo: array})
            let url_alert = "https://developer.nps.gov/api/v1/alerts?parkCode=" + code + park_key //fetch the second time using the unique park code to get the info about that specific park
            fetch(url_alert,{'Access-Control-Allow-Origin':'*'}).then(res => res.json()).then((result) => {
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
                <AlertDismissibleForPark onSearchChange={ //handle error
                        this.handleSearchChange
                    }
                    message={"You could misspell the park name?"}/>
            ) 
        } else if (!isLoaded) { //waiting for api response
            return (<Progress/>)
        } else { 
            if (!isAlertLoaded) {
                return (<Progress/>) //waiting for api response (second fetch)
            }
            const park = this.state.parkInfo
            const images1 = park[0].images;
            //only want to dispaly 3 images, so cut down the length of images returned from api
            let images = [] 
            if (images1.length > 3) {
                images = images1.slice(0, 3)
            } else {
                images = images1 //sometimes, the images returned from api only has 1 image 
            }
            const fee = park[0].entranceFees[0]

            // handle the case when images return is less than 3
            if (images.length < 3){
                if (images.length === 1){ //handle the case when only 1 image returned
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
                                    <Jumbo alerts = {this.state.alerts} //display all info
                                    park={park}
                                    fee = {fee} />
                                  
                                </Col>
                            </Row>
                        </div>
                    </div>
                </React.Fragment>
            )}
            else{ //handle the case when only 2 image returned
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
                                <Jumbo alerts = {this.state.alerts} //display all info
                                    park={park}
                                    fee = {fee} />
                                </Col>
                            </Row>

                        </div>
                    </div>
                </React.Fragment>
            )}
            }
            else{ //the genral cases, 3 images
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
                                <Jumbo alerts = {this.state.alerts}  //display all info
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
