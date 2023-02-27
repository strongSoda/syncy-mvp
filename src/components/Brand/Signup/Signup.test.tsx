import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Signup from './Signup';

test('renders Signup', () => {
  render(<Signup />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
