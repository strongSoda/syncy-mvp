import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import UnAuthenticatedRoute from './UnAuthenticatedRoute';

test('renders UnAuthenticatedRoute', () => {
  render(<UnAuthenticatedRoute />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
