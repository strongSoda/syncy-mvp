import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import AiPoc from './AiPoc';

test('renders AiPoc', () => {
  render(<AiPoc />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
