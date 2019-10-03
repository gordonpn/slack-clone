import React, {Component} from 'react';
//import DeleteChannelForm from './DeleteChannelForm';

export default class AddChannelForm extends Component {
    constructor() {
        super();
        this.state = {
            channelName: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({channelName: e.target.value});
    }

    render() {
        return (
            <div className="col-sm-3">
                <form className="form-group" style={{display: 'block'}}>
                    <input
                        className="form-control"
                        value={this.state.channelName}
                        type="text"
                        name="name"
                        placeholder="Enter Channel Name"
                        onChange={this.handleChange}
                    />
                    <input
                        className="submitButton"
                        type="submit"
                        value="Create Channel"
                        disabled={!this.state.channelName}
                        onClick={e => this.props.addChannel(e, this.state.channelName)}
                    />
                </form>
            </div>
        );
    }
}
