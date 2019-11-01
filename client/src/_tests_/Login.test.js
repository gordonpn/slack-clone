import React from 'react';
import {shallow} from 'enzyme';
import Login from '../components/Login';
require('../setupTests');

describe('Login component should render', () => {
  it('renders Login without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('div h3').text()).toBe("Login Page");
  });
});
