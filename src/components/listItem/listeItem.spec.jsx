import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ListItemText, Avatar } from '@material-ui/core';
import RecordItem from './index';
import { bike_blank_url } from '../../config';

const record = {
  id: 113006,
  title: 'Stolen 2017 Genesis Croix de fer 20 (frame: Reynolds 725)(blue)',
  description:
    'The bike was chained to a bicycle rack in our inner courtyard. I last saw it on the afternoon of 30th January. My downstairs neighbours can confirm that it was still there around 4:15pm. When I wanted to ride it to work the next morning at 7:30pm, it was gone (along with the lock).',
  address: 'Berlin, 10437, DE',
  occurred_at: 1580425200,
  updated_at: 1587956601,
  url: 'https://bikewise.org/api/v1/incidents/113006',
  source: {
    name: 'BikeIndex.org',
    html_url: 'https://bikeindex.org/bikes/691028',
    api_url: 'https://bikeindex.org/api/v1/bikes/691028'
  },
  media: {
    image_url: 'https://files.bikeindex.org/uploads/Pu/219203/large_croixdefer.jpg'
  },
  location_type: null,
  location_description: null,
  type: 'Theft',
  type_properties: null
};

const deepContainer = mount(<RecordItem record={record} />);

describe('<RecordItem /> with no props', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecordItem record={record} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Avatar shows blank bike image when there is no thumb image', () => {
    expect(deepContainer.find(Avatar).props().src).toEqual(bike_blank_url);
  });

  it('List has two ListItemText', () => {
    expect(deepContainer.find(ListItemText)).toHaveLength(2);
  });
});
