import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import OrderDetails from './OrderDetails';

test('renders OrderDetails', () => {
  render(<OrderDetails />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
