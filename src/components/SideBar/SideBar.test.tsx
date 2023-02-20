import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import SideBar from './SideBar';

test('renders SideBar', () => {
  render(<SideBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
