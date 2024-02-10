import React from 'react';
import { render, screen } from '@testing-library/react';
import SpinnerComponent from '../components/SpinnerComponent';

test('SpinnerComponent is rendered correctly', () => {
  // Render the SpinnerComponent
  render(<SpinnerComponent />);

  // Check if the SpinnerComponent is rendered
  const spinnerElement = screen.getByTestId('spinner-component');
  expect(spinnerElement).toBeInTheDocument();
});
