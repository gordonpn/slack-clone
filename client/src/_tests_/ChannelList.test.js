import React from 'react';
import {shallow} from 'enzyme';
import ChannelList from '../components/ChannelList';
require('../setupTests');

describe('ChannelList component should render channels', () => {
  let channels = [];
  let isLoadingChannels = false;
  let selectChannel = null;

  it('renders spinner when channels are loading', () => {
    isLoadingChannels = true;
    const wrapper = shallow(<ChannelList channels={channels} isLoadingChannels={isLoadingChannels} selectChannel={selectChannel} />);
    expect(wrapper.find('ul').children().length).toBe(0);
  });

  it('renders 1 channel', () => {
    isLoadingChannels = true;
    channels = [{name: "channelTest", id: "11222"}];
    const wrapper = shallow(<ChannelList channels={channels} isLoadingChannels={isLoadingChannels} selectChannel={selectChannel} />);
    expect(wrapper.find('ul').children().length).toBe(1);
  });
});
