import React from 'react';

import { render, screen } from '@testing-library/react';

import AiPocPage from './AiPocPage';

test('renders AiPocPage', () => {
  render(<AiPocPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
