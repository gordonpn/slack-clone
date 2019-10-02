import React, {Component} from 'react';
import ChatRoom from './ChatRoom';
import ChannelList from './ChannelList';
import AddChannelForm from './AddChannelForm';
import axios from 'axios';

export default class ChatDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [{name: 'channel1', id: 1}, {name: 'channel2', id: 2}],
      user: this.props.user,
      channelMessages: [],
      channelSelected: ''
    };

    this.selectChannel = this.selectChannel.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
  }

  componentDidMount() {
    // fetch all the channels then set state
  }

  selectChannel(channelId) {
    this.setState({channelSelected: channelId});
  }

  addChannel(e, name) {
    // post to db with new channel name
    const response = axios.post(
      '/channels',
      {"name": name},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data);

    e.preventDefault();
    if (!name) return;
    const id = Math.floor(Math.random() * 100);
    const newelement = {name: name, id: id};
    this.setState(prevState => ({
      channels: [...prevState.channels, newelement]
    }));
  }

  deleteChannel(e) {
    e.preventDefault();
    const newChannels = this.state.channels.filter(channel => {
      return channel.id !== this.state.channelSelected;
    });
    const channelSelected = newChannels.length >= 0 ? newChannels[0] : null;
    this.setState({
      channels: newChannels,
      channelSelected: channelSelected.id
    });
  }

  render() {
    return (
      <div>
        <div className="row dash">
          <div className="col-sm-3 channellist">
            <div className="channels">
              <ChannelList
                channels={this.state.channels}
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
        <div className="row">
          <AddChannelForm
            deleteChannel={this.deleteChannel}
            addChannel={this.addChannel}
          />
        </div>
      </div>
    );
  }
}
