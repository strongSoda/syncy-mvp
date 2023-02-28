import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import BrandCompleteProfile from './CompleteProfile';

test('renders BrandCompleteProfile', () => {
  render(<BrandCompleteProfile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
