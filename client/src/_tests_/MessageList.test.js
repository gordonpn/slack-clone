import React from 'react';
import {shallow} from 'enzyme';
import MessageList from '../components/MessageList';
require('../setupTests');

describe('MessageList component should render messages', () => {
  it('renders messageList with empty messages without crashing', () => {
    const messages = [];
    const wrapper = shallow(<MessageList messages={messages} />);
  });

  it('renders messageList with 1 message without crashing', () => {
    const messages = [{senderId: 111, parts: [{payload: {content: "hello"}}]}];
    const wrapper = shallow(<MessageList messages={messages} />);
    expect(wrapper.find('div')).toBeTruthy();
    console.log(wrapper.debug())
  });

});
