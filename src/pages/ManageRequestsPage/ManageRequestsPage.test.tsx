import React from 'react';

import { render, screen } from '@testing-library/react';

import ManageRequestsPage from './ManageRequestsPage';

test('renders ManageRequestsPage', () => {
  render(<ManageRequestsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
