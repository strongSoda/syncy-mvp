import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import PostTemplates from './PostTemplates';

test('renders PostTemplates', () => {
  render(<PostTemplates />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
