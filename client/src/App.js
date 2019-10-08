import React, {Component} from "react";
import ChatDashboard from "./components/ChatDashboard";
import Login from "./components/Login";
import {getUserByName, addUser} from "./api/users";
import Button from "react-bootstrap/Button";
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {username: "", id: "", friendIDs: [], channelIDs: []},
      isLoggedIn: false,
      isLoading: false
    };
    this.setUser = this.setUser.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }
  async componentDidMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
    if (isLoggedIn) {
      try {
        let userName = localStorage.getItem('userName');
        let user = await this.getUser(userName);

        this.setState({
          isloggedIn: true,
          user: user
        })
      } catch (err) {
        console.log(err);
      }
    }
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
      const user = await this.getUser(userName)
      this.setState({
        user: user,
        isLoggedIn: true
      })
      localStorage.setItem('isLoggedIn', this.state.isLoggedIn);
      localStorage.setItem('userName', JSON.stringify(this.state.user.username));
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

  async getUser(userName) {
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
      return newUser;
    } catch (err) {
      throw err;
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron-fluid" align="center">
          <h1>Slack Clone App</h1>
          <Button
            type="button"
            className="logoutButton btn btn-secondary"
            onClick={this.logOutUser}>
            Log out
          </Button>
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
