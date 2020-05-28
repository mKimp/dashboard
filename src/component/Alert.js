import React from 'react';
import {Modal, Alert, Button} from 'react-bootstrap'
/*
function AlertDismissible() {
    const [show, setShow] = React.useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <React.Fragment>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} href="/">
              Back to Main Page
            </Button>
   
          </Modal.Footer>
        </Modal>
    </React.Fragment>    
    );
  }
  */Alert
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