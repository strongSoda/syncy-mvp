import React from 'react';

import { render, screen } from '@testing-library/react';

import ContentPacksPage from './ContentPacksPage';

test('renders ContentPacksPage', () => {
  render(<ContentPacksPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
