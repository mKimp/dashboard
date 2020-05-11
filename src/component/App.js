import React from 'react';
import HomePage from './Home';
import Dashboard from './Dashboard';
import Alert from 'react-bootstrap/Alert';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isLoaded: false,
            isValid: false,
            parkLabel: [],
            parkSize: [],
            parkVisitors:[]
        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleTextChange(text) {
        this.setState({searchText: text})
    }
    handleSubmit() {
        this.state.parkData = this.props.data.map((item) => item.states[0].title)
        const search = this.state.searchText;

        this.state.parkData.forEach(element => {
            if (element == search) {
                const parks = this.props.data.filter(function (item) {
                    return item.states[0].title == search
                }).map(function (item) {
                    return item.title
                })
                const parkSize = this.props.data.filter(function (item) {
                    return item.states[0].title == search
                }).map(function (item) {
                    return item.area.acres
                })

                const visitors = this.props.data.filter(function (item) {
                    return item.states[0].title == search
                }).map(function (item) {
                    return item.visitors
                })

                this.setState({isLoaded: true})
                this.setState({parkLabel: parks, parkSize: parkSize, parkVisitors: visitors })

            }
        });
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
                    visitors={this.state.parkVisitors}/>
            )
        }
    }
}
export default App
