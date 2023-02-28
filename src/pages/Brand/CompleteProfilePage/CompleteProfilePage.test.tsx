import React from 'react';

import { render, screen } from '@testing-library/react';

import BrandCompleteProfilePage from './CompleteProfilePage';

test('renders BrandCompleteProfilePage', () => {
  render(<BrandCompleteProfilePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
