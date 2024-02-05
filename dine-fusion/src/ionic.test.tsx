import { IonApp } from '@ionic/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Example from './Example';
import Home from './pages/Home';

test('button presents a modal when clicked', async () => {
  render(
    <IonApp>
      <Example />
    </IonApp>
  );
  // Simulate a click on the button
  fireEvent.click(screen.getByText('Open'));
  // Wait for the modal to be presented
  await waitFor(() => {
    // Assert that the modal is present
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });
});