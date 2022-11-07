import { render, screen } from '@testing-library/react';
import {Navigation}  from './Components/FooterNavigation/Navigation';

test('renders learn react link', () => {
  render(<Navigation />);
  const linkElement = screen.getByText('Show Charts');
});
