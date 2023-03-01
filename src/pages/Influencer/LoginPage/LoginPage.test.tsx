import React from 'react';

import { render, screen } from '@testing-library/react';

import LoginPage from './LoginPage';

test('renders LoginPage', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
