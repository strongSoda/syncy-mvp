import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import MerchantsBar from './MerchantsBar';

test('renders MerchantsBar', () => {
  render(<MerchantsBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
