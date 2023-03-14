import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import InfluencerDashboard from './InfluencerDashboard';

test('renders InfluencerDashboard', () => {
  render(<InfluencerDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
