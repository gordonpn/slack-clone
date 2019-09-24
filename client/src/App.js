import React, { Component } from 'react'
import ChatDashboard from './components/ChatDashboard'
import Login from './components/Login'
import './index.css'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			user: null,
			isLoggedIn: true
		}
		this.setUser = this.setUser.bind(this)
	}
	setUser = userChild => {
		this.setState({ user: userChild, isLoggedIn: true })
	}
	render() {
		return (
			<div>
				<div className="jumbotron">
					<h1>Slack Clone App</h1>
				</div>
				{!this.state.isLoggedIn ? (
					<Login setUser={this.setUser} />
				) : (
					<ChatDashboard
						user={this.state.user}
						isloggedIn={this.state.isLoggedIn}
					/>
				)}
			</div>
		)
	}
}
