import { render, screen } from '@testing-library/react';
import {MapPage} from './Pages/App/MapPage';

test('Header is loaded', () => {
  render(<MapPage />);
  const linkElement = screen.getByText(/Astronomalies/i);
  expect(linkElement).toBeInTheDocument();
});
