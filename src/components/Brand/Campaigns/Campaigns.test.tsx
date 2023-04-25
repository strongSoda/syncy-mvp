import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Campaigns from './Campaigns';

test('renders Campaigns', () => {
  render(<Campaigns />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
