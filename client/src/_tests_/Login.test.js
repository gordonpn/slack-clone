import React from 'react';
import {shallow} from 'enzyme';
import Login from '../components/Login';
require('../setupTests');

describe('Login component should render', () => {
  it('renders Login without crashing', () => {
    const wrapper = shallow(<Login />);
  });
});
