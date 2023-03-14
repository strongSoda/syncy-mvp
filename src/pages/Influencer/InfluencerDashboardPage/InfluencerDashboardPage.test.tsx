import React from 'react';

import { render, screen } from '@testing-library/react';

import InfluencerDashboardPage from './InfluencerDashboardPage';

test('renders InfluencerDashboardPage', () => {
  render(<InfluencerDashboardPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
