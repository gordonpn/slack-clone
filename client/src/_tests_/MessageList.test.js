import React from 'react';
import {shallow} from 'enzyme';
import MessageList from '../components/MessageList';
require('../setupTests');

describe('MessageList component should render messages', () => {
  it('renders messageList with no messages displayed', () => {
    const messages = [];
    const wrapper = shallow(<MessageList messages={messages} />);
    const message = wrapper.find('div').text();
    expect(message).toBe("no messages");
  });

  it('renders messageList with 1 message displayed', () => {
    const messages = [{senderId: 111, parts: [{payload: {content: "hello"}}]}];
    const wrapper = shallow(<MessageList messages={messages} />);
    const message = wrapper.find('div div div').text();
    expect(message).toBe("111: hello");
  });

  it('renders messageList with multiple messages displayed', () => {
    const messages = [
      {senderId: 111, parts: [{payload: {content: "message1"}}]},
      {senderId: 222, parts: [{payload: {content: "message2"}}]}
    ];
    const wrapper = shallow(<MessageList messages={messages} />);
    const message1 = wrapper.find('div div div').getElements()[0].props.children;
    const message2 = wrapper.find('div div div').getElements()[1].props.children;
    expect(message1).toBe('111: message1');
    expect(message2).toBe('222: message2');
  });

});
