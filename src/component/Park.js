import React from 'react';
import Chart from './Chart';
class Park extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            items: [],
            isLoaded: false
        })

    }

    componentDidMount() {
        fetch("https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=Yellowstone&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD").then(res => res.json()).then((result) => {
            this.setState({isLoaded: true, items: result.data})
        }, (error) => {
            this.setState({isLoaded: true, error})
        })
    }
    render() {
        const {error, isLoaded, items} = this.state;
        if(error){
        return <div>Error: {error.message}</div>
        }
        else if (!isLoaded) {
        return <div>Loading...</div> }
        else {
            console.log(this.state.items)

            return (<div>lost</div>)        }
    }
}

export default Park;
