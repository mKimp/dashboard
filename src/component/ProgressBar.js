import React from 'react';

import Spinner from 'react-bootstrap/Spinner'
import './ProgressBar.css'
class Progress extends React.Component {
    constructor(props) {
        super(props)
    }
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
