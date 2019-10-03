import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            {" "}
            username:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
            <button onClick={e => this.props.logUserIn(e, this.state.username)}> log me in</button>
          </label>
        </form>
      </div>
    );
  }
}
