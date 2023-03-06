import React from 'react';

import { render, screen } from '@testing-library/react';

import MessagesPage from './MessagesPage';

test('renders MessagesPage', () => {
  render(<MessagesPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
