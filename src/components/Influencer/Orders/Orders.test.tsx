import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Orders from './Orders';

test('renders Orders', () => {
  render(<Orders />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
