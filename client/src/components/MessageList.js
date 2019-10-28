import React, {Component} from 'react'

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);

    this.state = {
      messages: this.props.channel.customData
    }
  }

  componentDidMount() {
    this.props.user.fetchMultipartMessages({
      roomId: this.props.channel.id
    })
      .then(messages => {
        const messageArr = messages.map(rawMessage => {
          const message = {senderId: rawMessage.senderId, text: rawMessage.parts[0].payload.content}
          return message
        })
        this.setState({
          messages: messageArr
        })
      })
      .catch(err => {
        console.log(`Error fetching messages: ${err}`)
      })
  }

  renderMessages() {
    return (
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {this.state.messages.map(message => {
          return (
            <li key={message.id}>
              {message.text}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    if(this.state.messages) {
      return this.renderMessages();
    } else {
      return (
        <div> no messages </div>
      )
    }
  }
}
