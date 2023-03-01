import React from 'react';

import { render, screen } from '@testing-library/react';

import InfluencerCompleteProfilePage from './CompleteProfilePage';

test('renders InfluencerCompleteProfilePage', () => {
  render(<InfluencerCompleteProfilePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
