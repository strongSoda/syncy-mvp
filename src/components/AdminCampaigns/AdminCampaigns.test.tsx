import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import AdminCampaigns from './AdminCampaigns';

test('renders AdminCampaigns', () => {
  render(<AdminCampaigns />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
