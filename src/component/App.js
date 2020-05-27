import React from 'react';
import HomePage from './Home';
import Dashboard from './Dashboard';
import {Modal, Alert, Button} from 'react-bootstrap'


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
            modalIsOpen: true

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

    handleTextChange(text) {
        this.setState({searchText: text})
    }
    handleSubmit(e) {
        const parkData = this.props.data.map((item) => item.states[0].title)
        const search = this.state.searchText;
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
                /*  const current = this.props.data.filter(function (item) {
                    return item.states[0].title === search
                })*/

                this.setState({hasResult: true})
                this.setState({parkLabel: parks, parkSize: parkSize, parkVisitors: visitors, coordinates: cood}) // coodLabell:current })
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
        } else if (this.state.isLoaded && !this.state.hasResult) {
            console.log(this.state.isLoaded)
            console.log(this.state.hasResult)
            return (
                <React.Fragment>
                    <Modal show={
                        this.state.modalIsOpen
                    }>
                        <Modal.Header>
                            <Modal.Title>Oops! Something is wrong</Modal.Title>

                        </Modal.Header>

                        <Modal.Body>
                            <p>
                                You could either misspell the state name OR the state does not have any National Parks
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={
                                    this.toggleModal
                                }
                                variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal>
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

                </React.Fragment>
            )

        } else {

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
