import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import './ProgressBar.css'

// just to let the user know they need to wait for the data to load
class Progress extends React.Component {

    render() {
        return (
            <div className="Progress">
                <Spinner animation="grow" variant="danger"/>
                <Spinner animation="grow" variant="warning"/>
                <Spinner animation="grow" variant="info"/>
            </div>


        )
    }
}

export default Progress
