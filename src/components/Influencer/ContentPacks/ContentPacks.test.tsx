import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import ContentPacks from './ContentPacks';

test('renders ContentPacks', () => {
  render(<ContentPacks />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
