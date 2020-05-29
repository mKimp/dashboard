import Carousel from 'react-bootstrap/Carousel'
import React from 'react';

class ControlledCarousel extends React.Component{
    constructor(props){
        super(props)
        this.state = ({
            index: 0,
            setIndex: 0
        })
        this.handleSelect = this.handleSelect.bind(this)
    }
    handleSelect(selectedIndex, e){
        this.setState({setIndex: selectedIndex})
    }
    render(){
        return(
            
            <div className="container">
            <span onClick="this.parentElement.style.display='none'" className="closebtn">&times;</span>
            <img id="expandedImg" style="width:100%" />
                
            </div>
            
        )
    }
}
export default ControlledCarousel