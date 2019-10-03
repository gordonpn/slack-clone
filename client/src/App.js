import React, { Component } from "react";
//import axios from "axios";
import ChatDashboard from "./components/ChatDashboard";
import Login from "./components/Login";
import { getUserByName, addUser } from "./api/user"
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { username: "", id: "", friendIDs: [], channelIDs: [] },
      isLoggedIn: false,
      isLoading: false
    };
    this.setUser = this.setUser.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }

  async setUser(e, userName) {
    e.preventDefault();
    try {
      const response = await await addUser(userName);
      if (response.data) {
        alert("Thank you for signing up, please login with your username: ", userName);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  async logUserIn(e, userName) {
    e.preventDefault();
    try {
      const response = await getUserByName(userName);//await axios.get(`/users/username/${userName}`);
      const newUser = {
        username: userName,
        id: response.data[0]._id,
        friendIDs: response.data[0].friendIDs,
        channelIDs: response.data[0].channelIDs
      }
      this.setState({
        user: newUser,
        isLoggedIn: true
      })
    } catch (error) {
      console.log(error);
      return;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron-fluid">
          <h1>Slack Clone App</h1>
        </div>
        {!this.state.isLoggedIn ? (
          <Login logUserIn={this.logUserIn} setUser={this.setUser} />
        ) : (
            <ChatDashboard
              user={this.state.user}
              isloggedIn={this.state.isLoggedIn}
            />
          )}
      </div>
    );
  }
}
