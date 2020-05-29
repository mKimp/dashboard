import React from 'react';
import {Modal, Alert, Button} from 'react-bootstrap'

class AlertDismissibleForPark extends React.Component {
    constructor(props){
        super(props)
        this.state = ({show:true, setShow:true})
        
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.resetPage = this.resetPage.bind(this);

    }
    resetPage() {
        this.props.onSearchChange();
    }
    handleClose(){
        this.setState({show:false})
        this.resetPage()
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
                <Button variant="secondary" onClick={this.handleClose}>
                  Back to DashBoard
                </Button>
       
              </Modal.Footer>
            </Modal>
        </React.Fragment>    )
    }
}
  
export default AlertDismissibleForPark