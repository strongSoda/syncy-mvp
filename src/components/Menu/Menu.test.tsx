import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Menu from './Menu';

test('renders Menu', () => {
  render(<Menu />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
