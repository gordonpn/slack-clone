import React, {Component} from 'react';
import MessageBox from './MessageBox';
import InviteModal from './InviteModal';
import MessageList from './MessageList';
export default class ChatRoom extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8" align="center">
          <div className="row">
            <div className="col-md-12 chatRoomTitle">
              <h2>{this.props.channel.name}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 messageList">
              <MessageList user={this.props.user} channel={this.props.channel} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 messageBox">
              <MessageBox user={this.props.user} channelId={this.props.channel.id}/>
            </div>
          </div>
        </div>
        <div className="col-md-4 inviteModal" align="center">
          <InviteModal channelId={this.props.channel.id} user={this.props.user}/>
        </div>
      </div>

    )
  }
}
