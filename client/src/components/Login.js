import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      loginPage: true,
      signUpPage: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.enableSignUpPage = this.enableSignUpPage.bind(this);
    this.enableLoginPage = this.enableLoginPage.bind(this);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  enableLoginPage(e) {
    e.preventDefault();
    this.setState({
      loginPage: true,
      signUpPage: false,
      username: ""
    })
  }

  enableSignUpPage(e) {
    e.preventDefault();
    this.setState({
      loginPage: false,
      signUpPage: true,
      username: ""
    })
  }


  loginPage() {
    return (
      <div className="col-sm">
        <h3>Login Page</h3>
        <br></br>
        <form>
          <label>
            username:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
            <button onClick={e => this.props.logUserIn(e, this.state.username)} disabled={!this.state.username}> log me in</button>
          </label>
          <div>
            Don't have username? sign up here
              <button onClick={e => this.enableSignUpPage(e)}> sign me up</button>
          </div>
        </form>
      </div>
    )
  };

  signUpPage() {
    return (
      <div className="col-sm">
        <h3>Sign Up Page</h3>
        <br></br>
        <form>
          <label>
            username:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
            <button onClick={e => this.props.setUser(e, this.state.username)} disabled={!this.state.username}> Sign me up</button>
          </label>
          <div>
            already have a username? log in here
              <button onClick={e => this.enableLoginPage(e)}> log me in</button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="row" align="center">
        {this.state.loginPage ? this.loginPage() : this.signUpPage()}
      </div>
    );
  }
}
