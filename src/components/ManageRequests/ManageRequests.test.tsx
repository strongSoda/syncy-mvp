import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import ManageRequests from './ManageRequests';

test('renders ManageRequests', () => {
  render(<ManageRequests />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
