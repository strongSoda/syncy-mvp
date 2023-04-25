import React from 'react';

import { render, screen } from '@testing-library/react';

import CampaignsPage from './CampaignsPage';

test('renders CampaignsPage', () => {
  render(<CampaignsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
