import React from 'react';
import { render } from '@testing-library/react';
import List from './index';

describe('List', () => {
  it('List shows loading when loading prop is set', () => {
    const { getByText } = render(<List loading />);
    const loading = getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('List shows error text when error prop is set', () => {
    const { getByText } = render(<List error />);
    const error = getByText('Can not load data, please try again');
    expect(error).toBeInTheDocument();
  });

  it('List shows empty text when no records are passed', () => {
    const { getByText } = render(<List records={[]} />);
    const empty = getByText('No results');
    expect(empty).toBeInTheDocument();
  });
});
