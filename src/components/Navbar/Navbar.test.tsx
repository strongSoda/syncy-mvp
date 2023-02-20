import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Navbar from './Navbar';

test('renders Navbar', () => {
  render(<Navbar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
