import React from 'react';
import {shallow} from 'enzyme';
import ChannelList from '../components/ChannelList';
require('../setupTests');

describe('ChannelList component should render channels', () => {
  const channels = [];
  const isLoadingChannels = false;
  const selectChannel = null;
  it('renders ChannelList with empty channels without crashing', () => {
    const wrapper = shallow(<ChannelList channels={channels} isLoadingChannels={isLoadingChannels} selectChannel={selectChannel} />);
  });
});
