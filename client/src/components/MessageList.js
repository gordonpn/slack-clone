import React, {Component} from 'react'

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }
  renderMessages() {
    return (
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {this.props.messages.map(message => {
          return (
            <li key={message.message}>
              {message.message}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    if(this.messages) {
      return this.renderMessages();
    } else {
      return (
        <div> no messages </div>
      )
    }
  }
}
