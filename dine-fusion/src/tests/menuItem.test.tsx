import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import MenuItem from '../components/MenuItem';
import { ShoppingCartProvider } from '../contexts/ShoppingCartContext';

// Mock für IonIcon, falls benötigt
vi.mock('@ionic/react', async () => {
    const actual: any = await vi.importActual('@ionic/react'); // Verwende `any` für den Typ von `actual`
    return {
      ...actual, // Spread `actual` hier
      IonIcon: vi.fn(() => null), // Mock spezifisch die IonIcon Komponente
    };
  });

const mockItem = {
  id: '1',
  description: 'Dies ist ein Testartikel',
  image: 'url-zum-bild.jpg',
  name: 'Test Item',
  price: 9.99,
};

describe('MenuItem Komponente', () => {
  it('sollte das Item korrekt rendern', () => {
    const { getByText } = render(
      <ShoppingCartProvider>
        <MenuItem item={mockItem} />
      </ShoppingCartProvider>
    );

    expect(getByText('Test Item')).toBeInTheDocument();
    expect(getByText('Dies ist ein Testartikel')).toBeInTheDocument();
    expect(getByText('9.99 €')).toBeInTheDocument();
  });

  it('sollte ein Item zum Warenkorb hinzufügen', async () => {
    const { getByRole } = render(
      <ShoppingCartProvider>
        <MenuItem item={mockItem} />
      </ShoppingCartProvider>
    );

    const button = screen.getByTestId('add-to-cart-button');
        fireEvent.click(button);
        
  });

});
