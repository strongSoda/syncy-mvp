import React from 'react';

import { render, screen } from '@testing-library/react';

import ManageMerchantsPage from './ManageMerchantsPage';

test('renders ManageMerchantsPage', () => {
  render(<ManageMerchantsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
