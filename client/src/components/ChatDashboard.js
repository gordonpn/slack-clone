import React, {Component} from 'react';
import ChatRoom from './ChatRoom';
import ChannelList from './ChannelList';
import AddChannelForm from './AddChannelForm';
import {addChannels, getChannelsForUser} from '../api/channels';
import ClipLoader from 'react-spinners/ClipLoader';
import {css} from '@emotion/core';

const override = css`
display: block;
margin: 0 auto;
border-color: #007bff;
`;

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
      localStorage.setItem('user', JSON.stringify(this.state.user));
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
        <div className="row dash">
          <div className="col-sm-3 channellist">
            <div className="channels">
              <h3>Channels</h3>
              <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={100}
                //color={'#007bff'}
                loading={this.state.isLoadingChannels}
              />
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
