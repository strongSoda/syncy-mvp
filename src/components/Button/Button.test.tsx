import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Button from './Button';

test('renders Button', () => {
  render(<Button />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
