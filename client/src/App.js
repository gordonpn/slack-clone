import React, {Component} from "react";
import ChatDashboard from "./components/ChatDashboard";
import Login from "./components/Login";
import {getUserByName, addUser} from "./api/users";
import Button from "react-bootstrap/Button";
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    const isLoggedIn = window.sessionStorage.getItem('isLoggedIn') ? true : false;
    const user = window.sessionStorage.getItem('user');
    this.state = {
      user: JSON.parse(user) || {username: "", id: "", friendIDs: [], channelIDs: []},
      isLoggedIn: isLoggedIn,
      isLoading: false
    };
    this.setUser = this.setUser.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  async setUser(userName) {
    try {
      const response = await addUser(userName);
      if (response.data) {
        alert(`Thank you for signing up, please login with your username: ${userName}`);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  async logUserIn(userName) {
    try {
      const response = await getUserByName(userName);
      if (response.data.length === 0) {
        console.log("invalid username");
        return
      }
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
      window.sessionStorage.setItem('isLoggedIn', this.state.isLoggedIn);
      window.sessionStorage.setItem('user', JSON.stringify(this.state.user));
    } catch (error) {
      console.log(error);
      return;
    }
  }
  logOutUser() {
    this.setState({
      isLoggedIn: false
    })
    localStorage.clear();
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron-fluid" align="center">
          <h1>Slack Clone App</h1>
          {this.state.isLoggedIn &&
            <Button
              type="button"
              className="logoutButton btn btn-secondary"
              onClick={this.logOutUser}>
              Log out
          </Button>
          }
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
