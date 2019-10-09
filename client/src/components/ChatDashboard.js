import React, {Component} from 'react';
import ChatRoom from './ChatRoom';
import AddChannelForm from './AddChannelForm';
import ChannelList from './ChannelList';
import {addChannels, getChannelsForUser} from '../api/channels';

export default class ChatDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      user: this.props.user,
      channelMessages: [],
      channelSelected: '',
      isLoadingChannels: true
    };

    this.selectChannel = this.selectChannel.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
  }

  componentDidMount() {
    // fetch all the channels then set state
    this.loadChannels().then(() => {
      this.setState({
        isLoadingChannels: false
      })
    });
  }

  async loadChannels() {
    let loadedChannels = Array.from(await getChannelsForUser(this.state.user['channelIDs']));
    this.setState({channels: loadedChannels});
  }

  selectChannel(channelId) {
    this.setState({channelSelected: channelId});
  }

  async addChannel(e, name) {
    e.preventDefault();
    if (!name) return;

    // post to db with new channel name and set state with the new channelId
    try {
      const channelId = await addChannels(name, this.props.user.id);
      const newElement = {name: name, id: channelId};
      const newUser = {...this.state.user};
      newUser.channelIDs.push(channelId);
      this.setState(prevState => ({
        channels: [...prevState.channels, newElement],
        user: newUser
      }));
      sessionStorage.setItem('user', JSON.stringify(this.state.user));
    } catch (error) {
      console.log(error); // handle this better in future issue
    }
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
        <div className="row">
          <div className="col-sm-3 leftCol">
            <div className="row">
              <div className="col-sm-12 chanelListTitle" align="center">
                <h4>Channels</h4>
              </div>
            </div>
            <ChannelList
              isLoadingChannels={this.state.isLoadingChannels}
              channels={this.state.channels}
              selectChannel={this.selectChannel}
            />
            <div className="row">
              <div className="col-sm-12 channelForm">
                <AddChannelForm
                  deleteChannel={this.deleteChannel}
                  addChannel={this.addChannel}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-9 rightCol">
            {!this.state.channelSelected ? (
              <div align="center">Please select a channel</div>
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
    );
  }
}
