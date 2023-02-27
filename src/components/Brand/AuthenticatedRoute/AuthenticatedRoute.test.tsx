import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import AuthenticatedRoute from './AuthenticatedRoute';

test('renders AuthenticatedRoute', () => {
  render(<AuthenticatedRoute />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
