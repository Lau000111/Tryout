// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Home from '../pages/Home'; // Pfad ggf. anpassen
// import * as ShoppingCartContext from '../contexts/ShoppingCartContext';
// import { MemoryRouter } from 'react-router-dom';
// import { getDishes } from '../api/route';
// import { SetStateAction } from 'react';

// // Mocks
// vi.mock('react-router-dom', async () => {
//   const actual: typeof import('react-router-dom') = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useHistory: vi.fn(),
//     // Füge hier weitere Mocks hinzu, falls erforderlich
//   };
// });


// vi.mock('./api/route', () => ({
//   getDishes: vi.fn(),
// }));

// vi.mock('./contexts/ShoppingCartContext', () => ({
//   useShoppingCart: vi.fn(),
// }));

// const mockItems: Item[] = [
//   {
//     id: '1',
//     description: 'Beschreibung für Item 1',
//     image: 'pfad/zum/bild1.jpg',
//     name: 'Item 1',
//     price: 9.99,
//   },
//   {
//     id: '2',
//     description: 'Beschreibung für Item 2',
//     image: 'pfad/zum/bild2.jpg',
//     name: 'Item 2',
//     price: 14.99,
//   },
// ];

// const mockDishes: Dish[] = [
//   {
//     name: 'Gericht 1',
//     items: [mockItems[0]],
//   },
//   {
//     name: 'Gericht 2',
//     items: [mockItems[1]],
//   },
// ];



// const mockCatalog: Catalog = {
//   id: 'catalog1',
//   dishes: mockDishes,
//   _rid: 'xyz',
//   _self: 'link/zu/catalog1',
//   _etag: '"0000c0a9-0000-0100-0000-5e217d00"',
//   _attachments: 'attachments/',
//   _ts: 1593043200,
// };

// beforeEach(() => {

//   const scrollByMock: {
//     (options?: ScrollToOptions): void;
//     (x: number, y: number): void;
//   } = vi.fn((...args: any[]) => {});
//     Element.prototype.scrollBy = scrollByMock;
//   // Mock für `scrollBy` auf Element-Prototyp hinzufügen, falls noch nicht vorhanden
//   if (!Element.prototype.scrollBy) {
//     Element.prototype.scrollBy = vi.fn();
//   }

//   localStorage.setItem('preferredLanguage', 'de');
//   vi.mocked(ShoppingCartContext.useShoppingCart).mockReturnValue({
//     items: [
//       {
//         id: '1',
//         description: 'Beschreibung für Item 1',
//         image: 'pfad/zum/bild1.jpg',
//         name: 'Item 1',
//         price: 9.99,
//         quantity: 2,
//       },
//       // Füge hier weitere ExtendedItem Objekte hinzu, falls nötig
//     ],
//     setItems: vi.fn(),
//     totalAmount: 0,
//     setTotalAmount: vi.fn(),
//   });
//   vi.mocked(getDishes).mockResolvedValue(mockDishes);
// });

// afterEach(() => {
//   localStorage.clear();
//   vi.restoreAllMocks();
// });


// afterEach(() => {
//   localStorage.clear();
//   vi.restoreAllMocks();
// });

// describe('Home Komponente', () => {
//   it('lädt und zeigt Gerichte korrekt an', async () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(screen.getByText('Gericht 1')).toBeInTheDocument());
//   });

//   it('wechselt die Sprache und lädt das entsprechende Menü', async () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     // Annahme: Eine Funktion zum Wechseln der Sprache existiert
//     // Dieses Beispiel verwendet direkt den Zustand und nicht eine UI-Interaktion
//     // Für eine UI-basierte Interaktion (z.B. Klick auf einen Button) müsste diese entsprechend simuliert werden

//     await waitFor(() => expect(screen.getByText('Gericht 1')).toBeInTheDocument());
//   });

// //   it('zeigt die Anzahl der Artikel im Einkaufswagen korrekt an', async () => {
// //     render(
// //       <MemoryRouter>
// //         <Home />
// //       </MemoryRouter>
// //     );

// //     expect(screen.getByText('🛒 2')).toBeInTheDocument();
// //   });

// //   // Weitere Tests hier einfügen...
// });
