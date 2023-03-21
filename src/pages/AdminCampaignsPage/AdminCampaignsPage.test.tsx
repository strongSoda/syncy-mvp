import React from 'react';

import { render, screen } from '@testing-library/react';

import AdminCampaignsPage from './AdminCampaignsPage';

test('renders AdminCampaignsPage', () => {
  render(<AdminCampaignsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
