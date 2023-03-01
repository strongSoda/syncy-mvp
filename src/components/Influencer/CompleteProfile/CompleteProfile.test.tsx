import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import InfluencerCompleteProfile from './CompleteProfile';

test('renders InfluencerCompleteProfile', () => {
  render(<InfluencerCompleteProfile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
