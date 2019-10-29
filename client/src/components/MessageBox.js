import {InputGroup, FormControl, Button} from 'react-bootstrap';
import React, {Component} from "react";
export default class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  handleChange(e) {
    this.setState({message: e.target.value});
  }
  sendMessage(e) {
    e.preventDefault();
    console.log('Message was ' + this.state.message)
    this.props.user.sendSimpleMessage({
      roomId: this.props.channel.id,
      text: this.state.message
    })
      .then(messageId => {
        console.log("messageId: ", messageId);
      })
      .catch(err => {
        console.log(err);
      })
    this.setState({message: ""});
  }
  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Sent a Message......"
          aria-label="Send a Message....."
          aria-describedby="basic-addon2"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <InputGroup.Append>
          <Button className="btn btn-secondary" disabled={!this.state.message} onClick={e => this.sendMessage(e)} >Send</Button>
        </InputGroup.Append>
      </InputGroup>


    )
  }
}
