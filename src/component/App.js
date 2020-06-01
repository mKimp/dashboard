import React from 'react';
import HomePage from './Home';
import Dashboard from './Dashboard';
import AlertDismissible from './Alert'

//Parent pgae, use to process data and distribute to dashboard
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isLoaded: false,
            isValid: false,
            parkLabel: [],
            parkSize: [],
            parkVisitors: [],
            coordinates: [],
            coodLabell: [],
            items: [],
            alerts: [],
            hasResult: false,
            correctstateName: false,
            usstates:["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"],
        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTextChange(text) {
        this.setState({searchText: text})
    }
    handleSubmit(e) {

        const parkData = this.props.data.map((item) => item.states[0].title) //filter out the states that have national parks
        const search = this.state.searchText;
        this.state.usstates.forEach(element => {
            if(element === search){ //check if the user input the correct state name
                this.setState({correctstateName:true})
            }
        });
        this.setState({isLoaded: true})

        parkData.forEach(element => {
            if (element === search) {
                const parks = this.props.data.filter(function (item) { //return back all the national parks info
                    return item.states[0].title === search
                }).map(function (item) {
                    return item.title
                })
                const parkSize = this.props.data.filter(function (item) {  //return back the sizes of all national parks
                    return item.states[0].title === search
                }).map(function (item) {
                    return item.area.acres
                })

                const visitors = this.props.data.filter(function (item) { // return back all the amount of visitors in the national parks
                    return item.states[0].title === search
                }).map(function (item) {
                    return item.visitors
                })

                const cood = this.props.data.filter(function (item) { //return back the coordinates of each national parks
                    return item.states[0].title === search
                }).map(function (item) {

                    return item.coordinates
                })  
                this.setState({hasResult: true})
                this.setState({parkLabel: parks, parkSize: parkSize, parkVisitors: visitors, coordinates: cood})
            }

        });

        let newArray = []
        const current = this.props.data.filter(function (item) { 
            return item.states[0].title === search
        })
        current.forEach((element) => { 
            const title = element.title
            const cood = element.coordinates
            const newData = { //create the array of objects that contain coordinate, description, and established date of each national park for using in Map
                "title": title,
                "cood": [
                    cood.latitude, cood.longitude
                ],
                "description": element.description,
                "established": element.date_established_readable
            };
            newArray.push(newData)
        })
        this.setState({
            coodLabell: [...this.state.coodLabell,...newArray]
        })
    }

    render() {
        let count = 0;
        this.props.data.forEach(element => {
            ++ count;
        });
        console.log(count)
        //The homepage is loaded at the first time
        if (!this.state.isLoaded && !this.state.hasResult) {
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
            )
        } else if (this.state.isLoaded && !this.state.hasResult && !this.state.correctstateName) { //the user input something but not one of the us states

            return (<AlertDismissible message={"You could misspell the state name?"}/> )

        } 
        else if (this.state.isLoaded && this.state.correctstateName && !this.state.hasResult ) { // the user input correct name of a state but that state does not have national parks
           return (<AlertDismissible message={"Sorry, this state DOES NOT have any National Parks"}/> )
     }
        else {
            //the state name is correct and that state has national parks, return Dashboard
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
                    visitors={
                        this.state.parkVisitors
                    }
                    coordinates={
                        this.state.coordinates
                    }
                    coodLabell={
                        this.state.coodLabell
                    }
                    totaldata={count}/>
            )
        }
    }

}
export default App
