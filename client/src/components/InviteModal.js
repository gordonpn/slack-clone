import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import { Modal } from "react-bootstrap";
export default class InviteModal extends Component {
constructor(){
  super();
  this.state={
    show: false,
    username:''
  }
  this.handleClose=this.handleClose.bind(this);
  this.handleShow=this.handleShow.bind(this);
  this.handleChange = this.handleChange.bind(this);
}
handleClose(){
  this.setState({show:false})

}
handleShow(){
  this.setState({
    show:true
  })
}
  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <>
        <form>
          <Button variant="primary" onClick={this.handleShow}>
            Invite Friend
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose a friend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Search For User <input type="text" onChange={this.handleChange}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button onClick={this.handleClose}>
                Invite This User
              </Button>
<h1>{this.state.username}</h1>
            </Modal.Footer>
          </Modal>
        </form>
      </>
    );
  }
}

