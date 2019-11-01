import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {updateUserChannel} from '../api/users';

export default class InviteModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      username: '',
      invalidUsername: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    this.setState({show: false, invalidUsername: false})

  }

  handleShow() {
    this.setState({
      show: true
    })
  }

  handleChange(e) {
    this.setState({username: e.target.value, invalidUsername: false});
  }

  async sendInvite(e) {
    e.preventDefault();
    try {
      const response = await updateUserChannel(this.state.username, this.props.channelId);
      if (response.status === 200) {
        await this.props.user.addUserToRoom({
          userId: response.data.user.username,
          roomId: this.props.channelId
        });
        console.log(`invite sent to ${this.state.username}`);
        this.setState({show: false, username: ""});
      }
    } catch (error) {
      if (error.response.status === 404) {
        this.setState({show: true, username: "", invalidUsername: true})
      }
    }
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
              Search For User <input type="text" value={this.state.username}
                onChange={this.handleChange} placeholder={this.state.placeHolder} />
              <div className="invalidUsername">
                {this.state.invalidUsername && "Invalid Username"}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button onClick={e => this.sendInvite(e)}
                disabled={!this.state.username}>
                Invite This User
              </Button>
              {/*<h1>{this.state.username}</h1>*/}
            </Modal.Footer>
          </Modal>
        </form>
      </>
    );
  }
}

