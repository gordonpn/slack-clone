import React, {Component} from 'react';
import ChatRoom from './ChatRoom';
import AddChannelForm from './AddChannelForm';
import ChannelList from './ChannelList';
import {addChannels, getChannelsForUser} from '../api/channels';
import ChatKit from '@pusher/chatkit-client';


export default class ChatDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      user: this.props.user,
      chatKitUser: {},
      chatKitRooms: [],
      channelMessages: [],
      channelSelected: '',
      isLoadingChannels: true
    };

    this.selectChannel = this.selectChannel.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator: 'v1:us1:55ce6f9e-f791-4467-ac53-ad1c8a1ecd27',
      userId: this.props.user.id,
      tokenProvider: new ChatKit.TokenProvider({
        url: 'http://localhost:3001/users/auth',
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({chatKitUser: currentUser})
        console.log(this.state.chatKitUser);
        })
      .catch(err => console.log(err));

    // fetch all the channels then set state
    this.loadChannels().then(() => {
      this.setState({
        isLoadingChannels: false
      })
    });
  }

  async loadChannels() {
    let loadedChannels = Array.from(await getChannelsForUser(this.state.user['channelIDs']));
    this.setState({
      channels: loadedChannels,
      chatKitRooms: this.state.chatKitUser.rooms
    });
    console.log(this.state.chatKitRooms)
  }

  async selectChannel(channel) {
    await this.state.chatKitUser.subscribeToRoomMultipart({
      roomId: channel.id,
      hooks: {
        onMessage: message => {
          const customData = !message.customData ? [] : message.customData;
          customData.push({senderId: message.senderId, message: message.parts[0].payload.content});
          channel.customData = customData;
        }
      },
      messageLimit: 10
    })
    this.setState({channelSelected: channel});
  }

  async addChannel(e, name) {
    e.preventDefault();
    if (!name) return;

    // post to db with new channel name and set state with the new channelId
    try {
      const channel = await addChannels(name, this.props.user.id);
      this.state.chatKitUser.createRoom({
        id: channel._id,
        name: channel.name
      }).then(room => {
        console.log("created room ", room);
        this.setState(prevState => ({
          chatKitRooms: [...prevState.chatKitRooms, room]
        }));
      }).catch(err => {
        console.log(err);
      })
      const newUser = {...this.state.user};
      newUser.channelIDs.push(channel._id);
      this.setState(prevState => ({
        channels: [...prevState.channels, channel],
        user: newUser
      }));
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
              channels={this.state.chatKitRooms}
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
                  user={this.state.chatKitUser}
                  messages={this.getChannelMessages}
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}
