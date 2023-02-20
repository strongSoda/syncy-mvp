import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import ManageMerchants from './ManageMerchants';

test('renders ManageMerchants', () => {
  render(<ManageMerchants />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
