import React from 'react';
import HomePage from './Home';
import Dashboard from './Dashboard';
import AlertDismissible from './Alert'

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
            modalIsOpen: true,
            correctstateName: false,
            usstates:["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"],
            visible: true


        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }
    toggleModal() {

        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    toggleAlert (){
        this.setState({visible: !this.state.visible})

    }

    handleTextChange(text) {
        this.setState({searchText: text})
    }
    handleSubmit(e) {

        const parkData = this.props.data.map((item) => item.states[0].title)
        const search = this.state.searchText;
        this.state.usstates.forEach(element => {
            if(element == search){
                this.setState({correctstateName:true})
            }
        });
        this.setState({isLoaded: true})

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
            const newData = {
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
            coodLabell: [
                ...this.state.coodLabell,
                ... newArray
            ]
        })
    }

    render() {
        let count = 0;
        this.props.data.forEach(element => {
            ++ count;
        });
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
        } else if (this.state.isLoaded && !this.state.hasResult && !this.state.correctstateName) {

            return (<AlertDismissible message={"You could misspell the state name?"}/> )

        } 
        else if (this.state.isLoaded && this.state.correctstateName && !this.state.hasResult ) {
           return (<AlertDismissible message={"Sorry, this state DOES NOT have any National Parks"}/> )
     }
        else {

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
                    totaldata
                    ={count}/>
            )
        }
    }

}
export default App
