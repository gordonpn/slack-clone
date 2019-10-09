import React, { Component } from 'react';

export default class ChatRoom extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8" align="center">
          <div className="row">
            <div className="col-md-12 chatRoomTitle">Chat Room {this.props.channel}</div>
          </div>
          <div className="row">
            <div className="col-md-12 messageBox">
            Message Box
            </div>
          </div>
        </div>
        <div className="col-md-4 inviteModal" align="center">
          Invite Modal / User List
          </div>
      </div>

    )
  }
}
