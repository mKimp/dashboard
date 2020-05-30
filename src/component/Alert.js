import React from 'react';
import {Modal, Button} from 'react-bootstrap'

//Alert to handle the error that could happen in the homepage: enter the wrong state name, or the state does not have the national parks
class AlertDismissible extends React.Component {
    constructor(props){
        super(props)
        this.state = ({show:true, setShow:true})
        
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)

    }
    handleClose(){
        this.setState({show:false})
    }
    handleShow(){
        this.setState({show:true})
    }
    render(){
        return( <React.Fragment>
            <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>Oops! Something is wrong</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.props.message}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose} href="/">
                  Back to Main Page
                </Button>
       
              </Modal.Footer>
            </Modal>
        </React.Fragment>    )
    }
}
  
export default AlertDismissible