import React from 'react';
import Chart from './Chart';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const data = this.props.data; 

        return (
            <Chart data={data}/>
        )
  
        
    }


}

export default DashBoard
