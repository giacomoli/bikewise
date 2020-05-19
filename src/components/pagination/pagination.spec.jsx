import React from 'react';
import { mount } from 'enzyme';
import { Pagination } from '@material-ui/lab';
import RecordPagination from './index';

describe('Pagination', () => {
  it('Pagination shows only one disabled page-item when the list is empty.', () => {
    const wrapper = mount(<RecordPagination totalRecordCount={0} />);

    //should render only 1 button (Next, Prev, First, Last is default)
    const pagination = wrapper.find(Pagination);
    expect(pagination.props().count).toEqual(1);
  });

  it('Pagination renders correct number of pages', () => {
    const wrapper = mount(<RecordPagination totalRecordCount={32} />);

    //should render 1,2,3,4 & Next, Prev, First, Last buttons.
    const pagination = wrapper.find(Pagination);
    expect(pagination.props().count).toEqual(4);
    expect(pagination.props().showFirstButton).toEqual(true);
    expect(pagination.props().showLastButton).toEqual(true);
  });
});
