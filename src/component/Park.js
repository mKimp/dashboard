import React from 'react';
import Chart from './Chart';
import {Modal} from 'react-bootstrap'
class Park extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({items: [], isLoaded: false, text:this.props.text, parkCode:'', alerts:[], isAlertLoaded:false})
        this.fetchParkCode = this.fetchParkCode.bind(this)
    }

    componentDidMount() {
        let url = "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=" + this.state.text + "&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
        }, (error) => {
            this.setState({isLoaded: true, error})
        })
    }
    fetchParkCode(code){
        let url = "https://developer.nps.gov/api/v1/alerts?parkCode="+ code + "&stateCode=&q=&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD"
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({isAlertLoaded: true, alerts: result.data})
        }, (error) => {
            this.setState({isAlertLoaded: true, error})
        })
    }
    render() {
        //console.log(this.state.text)
        const {error, isLoaded, items} = this.state;
        const {errorA, isAlertLoaded, alerts} = this.state;
        if (error) {
            return <div>Error: {
                error.message
            }</div>
        } else if (!isLoaded) {
            return <div>Loading</div>}
            
        else {
                    const array = this.state.items.filter((item)=> item.name === this.state.text )
                    const code = array[0].parkCode
                    this.fetchParkCode(code)
                   
                    if(!isAlertLoaded){
                        return(<div>Loading Alert</div>)
                    }
                    else{
                       // console.log(this.state.alerts)
                       const alert = this.state.alerts
                        return (<Modal.Dialog>
                            <Modal.Header closeButton>
                            <Modal.Title>{alert[0].category}</Modal.Title>
                            </Modal.Header>
            
                            <Modal.Body>
                                <p>{alert[0].title}</p>
                        <p>{alert[0].description}</p>
                            </Modal.Body>
                            
                            </Modal.Dialog>)                         }
                    
                
            }
                }
                }
                
        
                export default Park;
