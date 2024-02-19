import React from 'react';
import { render, screen } from '@testing-library/react';
import SpinnerComponent from '../components/SpinnerComponent';

test('SpinnerComponent is rendered correctly', () => {
  render(<SpinnerComponent />);

  const spinnerElement = screen.getByTestId('spinner-component');
  expect(spinnerElement).toBeDefined();
});
