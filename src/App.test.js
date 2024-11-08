import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const linkElement = screen.getByLabelText(/logo/i)
  expect(linkElement).toBeInTheDocument();
});
