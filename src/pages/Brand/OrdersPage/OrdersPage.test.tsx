import React from 'react';

import { render, screen } from '@testing-library/react';

import OrdersPage from './OrdersPage';

test('renders OrdersPage', () => {
  render(<OrdersPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
