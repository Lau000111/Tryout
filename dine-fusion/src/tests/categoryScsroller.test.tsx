import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryScroller from '../components/CategoryScroller';
import React from 'react';

const mockDishes = [
  { name: 'Vorspeisen', items: [{ id: '1', name: 'Salat', description: 'Frischer Salat', image: '', price: 5 }] },
  { name: 'Hauptgerichte', items: [{ id: '2', name: 'Steak', description: 'Saftiges Steak', image: '', price: 20 }] },
  { name: 'Desserts', items: [{ id: '3', name: 'Eis', description: 'Kühles Eis', image: '', price: 3 }] },
];


describe('CategoryScroller', () => {
  const onCategoryChangeMock = vi.fn();

  beforeEach(() => {
    onCategoryChangeMock.mockReset();

    render(
      <CategoryScroller 
        categories={mockDishes} 
        selectedCategory={mockDishes[0]} 
        onCategoryChange={onCategoryChangeMock} 
      />
    );
  });

  it('sollte alle Kategorien rendern', () => {
    mockDishes.forEach(dish => {
      expect(screen.getByText(dish.name)).toBeInTheDocument();
    });
  });

  it('sollte zur nächsten Kategorie wechseln, wenn der Vorwärts-Button geklickt wird', () => {

    render(
      <CategoryScroller 
        categories={mockDishes} 
        selectedCategory={mockDishes[1]} 
        onCategoryChange={onCategoryChangeMock} 
      />
    );
    
    fireEvent.click(screen.getByTestId('forward-buttonScroller'));
    expect(onCategoryChangeMock).toHaveBeenCalledWith(mockDishes[1]);
  });

  it('sollte zur vorherigen Kategorie wechseln, wenn der Zurück-Button geklickt wird', async () => {
    render(
      <CategoryScroller 
        categories={mockDishes} 
        selectedCategory={mockDishes[1]} 
        onCategoryChange={onCategoryChangeMock} 
      />
    );

    const backButtonList = screen.getAllByTestId('back-buttonScroller');
    fireEvent.click(backButtonList[0]); 
  });
});
