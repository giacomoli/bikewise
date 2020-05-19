import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { TextField } from '@material-ui/core';

import Search from './index';

const deepContainer = mount(<Search />);

describe('<Search /> with no props', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Search has three Search Fields', () => {
    expect(deepContainer.find(TextField)).toHaveLength(3);
  });
});
