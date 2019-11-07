import React from 'react';
import {shallow} from 'enzyme';
import AddChannelForm from '../components/AddChannelForm';
require('../setupTests');

describe('AddCHannelForm component should render', () => {
  it('renders AddChannelForm without crashing', () => {
    const wrapper = shallow(<AddChannelForm />);
    expect(wrapper.find('Button').text()).toBe('Create Channel');
  });
});
