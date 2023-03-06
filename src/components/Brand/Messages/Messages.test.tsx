import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Messages from './Messages';

test('renders Messages', () => {
  render(<Messages />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
