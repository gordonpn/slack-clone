import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            {" "}
            username
            <input type="text" />
            password
            <input type="password" />
            <button> log me in</button>
          </label>
        </form>
      </div>
    );
  }
}
