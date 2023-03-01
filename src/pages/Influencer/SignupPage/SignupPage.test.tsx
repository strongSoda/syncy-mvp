import React from 'react';

import { render, screen } from '@testing-library/react';

import SignupPage from './SignupPage';

test('renders SignupPage', () => {
  render(<SignupPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
