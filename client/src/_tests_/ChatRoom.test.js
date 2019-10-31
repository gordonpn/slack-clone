import React from 'react';
import {shallow} from 'enzyme';
import ChatRoom from '../components/ChatRoom';
require('../setupTests');

describe('ChatRoom component should render channels', () => {
  const channel = {name: "name"};
  it('renders ChatRoom with empty channels without crashing', () => {
    const wrapper = shallow(<ChatRoom channel={channel} />);
  });
});
