import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuComponent from '../components/MenuComponent';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; 

// Mock useHistory
vi.mock('react-router-dom', () => ({
  useHistory: vi.fn(),
}));

// Mock useShoppingCart
vi.mock('../contexts/ShoppingCartContext', () => ({
  useShoppingCart: vi.fn(() => ({ items: [] })),
}));

describe('MenuComponent', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MenuComponent />
      </I18nextProvider>
    );
  });

  it('sollte das Hauptmenü korrekt rendern', () => {
    const allTitles = screen.getAllByText(/settings.title/i);
    expect(allTitles.length).toBeGreaterThan(0);
    
  });

  it('sollte das Sprachmenü anzeigen, wenn der Benutzer das Sprachänderungsmenü auswählt', () => {
    fireEvent.click(screen.getByTestId('change-language-button'));
    expect(screen.getByText(/settings.chanceLanguage.title/i)).toBeInTheDocument();
  });

  it('sollte die Sprache ändern, wenn der Benutzer eine Sprache auswählt', () => {
    // Hier musst du die Logik anpassen, um zu überprüfen, ob die Sprache tatsächlich geändert wurde.
    // Dies könnte durch Überprüfen des aktualisierten Textes nach der Sprachänderung oder durch einen Mock von i18n.changeLanguage erfolgen.
  });
});
