import React from 'react';

import { render, screen } from '@testing-library/react';

import ForgotPasswordPage from './ForgotPasswordPage';

test('renders LoginPage', () => {
  render(<ForgotPasswordPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
