import React, { Component } from "react";
import axios from "axios";
import ChatDashboard from "./components/ChatDashboard";
import Login from "./components/Login";
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { username: "", id: "", friendIDs: [], channelIDs: [] },
      isLoggedIn: false
    };
    this.setUser = this.setUser.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }
  async setUser(e, userName) {
    e.preventDefault();
    await axios.post('/users', {
      username: userName
    })
      .then(response => {
        const newUser = {
          username: userName,
          id: response.data['_id'],
          friendIDs: response.data['friendIDs'],
          channelIDs: response.data['channelIDs']
        }
        this.setState({
          user: newUser,
          isLoggedIn: true
        })
      })
      .catch(error => {
        if (error.response) {
          console.log(error.data.message);
          alert("username already exits")
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };

  async logUserIn(e, userName) {
    e.preventDefault();

    await axios.get(`/users/username/${userName}`)
      .then(response => {
        // handle success
        console.log("successful login");

        const user = {
          username: userName,
          id: response.data['_id'],
          friendIDs: response.data['friendIDs'],
          channelIDs: response.data['channelIDs']
        }
        this.setState({
          user: user,
          isLoggedIn: true
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data);
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron-fluid">
          <h1>Slack Clone App</h1>
        </div>
        {!this.state.isLoggedIn ? (
          <Login logUserIn={this.logUserIn} />
        ) : (
            <ChatDashboard
              user={this.state.user}
              isloggedIn={this.state.isLoggedIn}
              name="mack"
            />
          )}
      </div>
    );
  }
}
