import { InputGroup, FormControl, Button} from 'react-bootstrap';
import React, {Component} from "react";
export default class MessageBox extends Component {
  constructor() {
    super();
    this.state={
    message:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
  }
  handleChange(e) {
    this.setState({message:e.target.value});
  }
sendMessage(e){
    e.preventDefault();
  this.setState({message:this.state.message});
  console.log('Message was '+this.state.message)
  }
  render (){
    return(
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Sent a Message......"
          aria-label="Send a Message....."
          aria-describedby="basic-addon2"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <InputGroup.Append>
          <Button disabled={!this.state.message} onClick={e=>this.sendMessage(e)}  variant="outline-secondary">Send</Button>
        </InputGroup.Append>
      </InputGroup>


    )
  }
}
