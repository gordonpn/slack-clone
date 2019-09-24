import React, { Component } from 'react'

export default class ChatRoom extends Component {
	render() {
		return <div>Chat Room {this.props.channel}</div>
		//display messages and have input to send messages
	}
}
