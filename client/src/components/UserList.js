import React, {Component} from 'react'

export default class UserList extends Component {
  render() {
    return (
      <div>
        <br></br>
        <div>
          <h3>Users in this chat:</h3>
        </div>
        {this.props.users.map(user => {
          return (
            <div>
              {user.name}
            </div>
          )
        })}
      </div>
    )
  }
}
