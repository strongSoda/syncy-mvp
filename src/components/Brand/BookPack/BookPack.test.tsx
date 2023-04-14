import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import BookPack from './BookPack';

test('renders BookPack', () => {
  render(<BookPack />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
