import React, {Component} from "react";
import Button from "react-bootstrap/Button";

export default class ChannelList extends Component {
    render() {
        return (
            <div>
                <h3>Channels</h3>
                <ul
                    style={{
                        listStyleType: "none",
                        paddingLeft: "0px"
                    }}
                >
                    {this.props.channels.map(channel => {
                        return (
                            <li
                                style={{paddingBottom: "5px"}}
                                key={channel.id}
                                value={channel.name}
                            >
                                <Button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={() => this.props.selectChannel(channel.id)}
                                >
                                    {channel.name}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
