import React from 'react';

import { render, screen } from '@testing-library/react';

import OrderDetailsPage from './OrderDetailsPage';

test('renders OrderDetailsPage', () => {
  render(<OrderDetailsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
