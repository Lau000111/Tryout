// PaymentPage.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentPage from '../pages/Payment';
import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import * as ShoppingCartContext from '../contexts/ShoppingCartContext';
import '@testing-library/jest-dom';
import { getDishes } from '../api/route';
import { arrowBack } from 'ionicons/icons';

const mockItems: Item[] = [
  {
    id: '1',
    description: 'Beschreibung für Item 1',
    image: 'pfad/zum/bild1.jpg',
    name: 'Item 1',
    price: 9.99,
  },
  {
    id: '2',
    description: 'Beschreibung für Item 2',
    image: 'pfad/zum/bild2.jpg',
    name: 'Item 2',
    price: 14.99,
  },
];


const mockDishes: Dish[] = [
  {
    name: 'Gericht 1',
    items: [mockItems[0]],
  },
  {
    name: 'Gericht 2',
    items: [mockItems[1]],
  },
];

vi.mock('@ionic/react', async () => {
    // Importiere das tatsächliche Modul und weise ihm einen expliziten Typ zu
    const actual: typeof import('@ionic/react') = await vi.importActual('@ionic/react');
    return {
      ...actual,
      IonIcon: vi.fn(() => null), // Beispiel für einen gemockten IonIcon
      // Füge hier weitere Mocks hinzu, falls benötigt
    };
  });

vi.mock('react-router-dom', () => ({
  useHistory: vi.fn(),
}));

vi.mock('../api/route', () => ({
  getDishes: vi.fn(() => Promise.resolve(mockDishes)),
}));

vi.mock('../contexts/ShoppingCartContext', () => ({
  useShoppingCart: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key, // Einfache Übersetzungsfunktion, die den Schlüssel zurückgibt
  }),
}));

beforeEach(() => {
  vi.mocked(useHistory).mockReturnValue({
    push: vi.fn(),
    goBack: vi.fn(),
  } as any);

  vi.mocked(ShoppingCartContext.useShoppingCart).mockReturnValue({
    items: [
      {
        id: '1',
        description: 'Beschreibung für Item 1',
        image: 'pfad/zum/bild1.jpg',
        name: 'Item 1',
        price: 9.99,
        quantity: 2,
      },
      // Füge hier weitere ExtendedItem Objekte hinzu, falls nötig
    ],
    setItems: vi.fn(),
    totalAmount: 0,
    setTotalAmount: vi.fn(),
  });
  vi.mocked(getDishes).mockResolvedValue(mockDishes);

  // Clear all mocks before each test
  vi.clearAllMocks();
});

describe('PaymentPage', () => {
  it('renders correctly and displays total amount', () => {
    render(<PaymentPage />);
    
    expect(screen.getByText('paymendPage.inTotal 0.00 €')).toBeInTheDocument();
  });

  it('navigates back on back button click', async () => {
    const { goBack } = useHistory();
    render(<PaymentPage />);
    
    fireEvent.click(screen.getByTestId('back-button'));
    expect(goBack).toHaveBeenCalled();
  });

});
