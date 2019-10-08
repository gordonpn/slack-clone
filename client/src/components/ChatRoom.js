import React, { Component } from 'react'
import InviteModal from "./InviteModal";
import MessageBox from "./MessageBox";
export default class ChatRoom extends Component {
	render() {
		return <div>
      <div>Chat Room {this.props.channel}</div>
     <div className="messageBar">
       <div className="col-xs-2">
       <MessageBox/>
       </div>
      </div>
      <div className="modalbutton"><InviteModal/></div>

    </div>
	}
}
