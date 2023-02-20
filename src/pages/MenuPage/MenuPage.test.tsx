import React from 'react';

import { render, screen } from '@testing-library/react';

import MenuPage from './MenuPage';

test('renders MenuPage', () => {
  render(<MenuPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
