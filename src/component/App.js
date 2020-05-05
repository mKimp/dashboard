import React from 'react';
import HomePage from './Home';
import Dashboard from './Dashboard';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isLoaded: false
        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleTextChange(text) {
        this.setState({searchText: text})
    }
    handleSubmit() {
        this.setState({isLoaded: true})
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
            );
        }
        else{
            return (<Dashboard data={this.props.data}/>)
        }
    }
}
export default App
