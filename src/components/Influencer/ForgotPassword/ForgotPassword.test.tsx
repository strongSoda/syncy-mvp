import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import ForgotPassword from './ForgotPassword';

test('renders Login', () => {
  render(<ForgotPassword />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
