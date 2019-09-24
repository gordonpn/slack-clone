import React, { Component } from 'react'
import ChatRoom from './ChatRoom'
import ChannelList from './ChannelList'

export default class ChatDashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			channels: [{ name: 'channel1', id: 1 }, { name: 'channel2', id: 2 }],
			user: this.props.user,
			channelMessages: [],
			channelSelected: ''
		}
		this.selectChannel = this.selectChannel.bind(this)
	}
	componentDidMount() {
		// fetch all the channels then set state
	}

	selectChannel(channelId) {
		this.setState({ channelSelected: channelId })
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-3">
					<div className="channels">
						<ChannelList
							channels={this.state.channels}
							channelId={this.state.channelSelected.id}
							selectChannel={this.selectChannel}
						/>
					</div>
				</div>
				<div className="col-sm-9" align="center">
					<div className="chatRoom">
						{!this.state.channelSelected ? (
							<div>Please select a channel</div>
						) : (
							<ChatRoom
								channel={this.state.channelSelected}
								user={this.state.user}
								messages={this.getChannelMessages}
							/>
						)}
					</div>
				</div>
			</div>
		)
	}
}
