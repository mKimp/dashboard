import React from 'react';
import HomePage from './Home';
import Dashboard from './Dashboard';
import Alert from 'react-bootstrap/Alert';
import update from 'react-addons-update';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isLoaded: false,
            isValid: false,
            parkLabel: [],
            parkSize: [],
            parkVisitors:[],
            coordinates:[],
            coodLabell:[],
            items:[],
            isLoaded:false
        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentDidMount(){
        fetch("https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&q=Yellowstone&api_key=ggkV9uIryYjb4jyp0qeVrwCwE5rObHy68Il8hhKD")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({isLoaded:true, items:result.data})
            },
            (error) => {
                this.setState({isLoaded:true, error})
            }
        )
      }

    handleTextChange(text) {
        this.setState({searchText: text})
    }
    handleSubmit(e) {
        const parkData = this.props.data.map((item) => item.states[0].title)
        const search = this.state.searchText; 
        parkData.forEach(element => {
            if (element == search) {
                const parks = this.props.data.filter(function (item) {
                    return item.states[0].title === search
                }).map(function (item) {
                    return item.title
                })
                const parkSize = this.props.data.filter(function (item) {
                    return item.states[0].title === search
                }).map(function (item) {
                    return item.area.acres
                })

                const visitors = this.props.data.filter(function (item) {
                    return item.states[0].title === search
                }).map(function (item) {
                    return item.visitors
                })
       
                const cood = this.props.data.filter(function (item) {
                    return item.states[0].title === search
                }).map(function (item) {

                    return item.coordinates
                })
              /*  const current = this.props.data.filter(function (item) {
                    return item.states[0].title === search
                })*/

                this.setState({isLoaded: true})
                this.setState({parkLabel: parks, parkSize: parkSize, parkVisitors: visitors, coordinates:cood})//coodLabell:current })
            }

        });
    
       let newArray = []
        const current = this.props.data.filter(function (item) {
                    return item.states[0].title === search
        })
        current.forEach((element) => {
            const title = element.title
            const cood = element.coordinates
            const  newData = {"title": title, "cood": [cood.latitude, cood.longitude], "description": element.description, "established": element.date_established_readable}; 
            newArray.push(newData)

        


    //    this.state.parkData.forEach(element => {
    //        if (element == search) {
    //        }
    //    })
    })
    this.setState({coodLabell:[...this.state.coodLabell,...newArray]})
    
    
}

 

    render() {

        if (!this.state.isLoaded) {

                return (
                <div>
                    <HomePage textChange={
                            this.state.searchText
                        }
                        onTextChange={
                            this.handleTextChange
                        }
                        onSubmitChange={
                            this.handleSubmit
                        }/>
                </div> 
            )} else {
                return (

                <Dashboard dataLabel={
                        this.state.parkLabel
                    }
                    dataSize={
                        this.state.parkSize
                    }
                    searchName={
                        this.state.searchText
                    }
                    visitors={this.state.parkVisitors}
                    coordinates={this.state.coordinates}
                    coodLabell={this.state.coodLabell}
                    totaldata ={this.props.data}
                    />
            )
        }
    }
}
export default App
