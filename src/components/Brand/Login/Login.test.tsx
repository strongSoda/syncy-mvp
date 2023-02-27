import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Login from './Login';

test('renders Login', () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
