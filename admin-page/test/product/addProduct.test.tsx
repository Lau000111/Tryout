import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductForm } from '../../app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form'; // Pfad anpassen
import { CatalogContext } from '@/context/CatalogContext'; // Pfad anpassen
import { Catalog, Dish, Item, Product } from '@/types/schema';

// Mock-Daten für den Test
const mockItem: Item = {
    id: "item1",
    description: "Ein leckeres Gericht mit frischen Zutaten",
    image: "url-zum-bild.jpg",
    name: "Spaghetti Carbonara",
    price: 9.99,
  };
  
  // Mock Dish
  const mockDish: Dish = {
    name: "Pasta Gerichte",
    items: [
      mockItem,
      {
        id: "item2",
        description: "Ein klassisches italienisches Gericht",
        image: "url-zum-bild2.jpg",
        name: "Lasagne",
        price: 12.99,
      },
    ],
  };
  
  // Mock Catalog
  const mockCatalog: Catalog = {
    id: "catalog1",
    dishes: [
      mockDish,
      {
        name: "Pizza",
        items: [
          {
            id: "item3",
            description: "Pizza Margherita mit hausgemachter Tomatensauce",
            image: "url-zum-bild3.jpg",
            name: "Pizza Margherita",
            price: 7.99,
          },
          {
            id: "item4",
            description: "Pizza mit Salami, Pilzen und Mozzarella",
            image: "url-zum-bild4.jpg",
            name: "Pizza Salami",
            price: 8.99,
          },
        ],
      },
    ],
    _rid: "rid123",
    _self: "selfUrl",
    _etag: "etag123",
    _attachments: "attachmentsUrl",
    _ts: 1615159002,
  };

const mockInitialData: Product = {
    id: "product1",
    name: "Beispielprodukt",
    price: 100,
    colorId: "color1",
    sizeId: "size1",
    isFeatured: false,
    isArchived: false,
    storeId: "store1",
    orderItems: [],
    // Annahme, dass `Size` und `Color` einfache Objekte oder Referenzen auf bestehende Entitäten sind
    size: {
      id: "size1",
      storeId: "store1",
      name: "Medium",
      value: "M",
      products: [], // Normalerweise würdest du hier nicht leere Arrays einfügen, aber für das Mock-Objekt ist es in Ordnung.
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    color: {
      id: "color1",
      storeId: "store1",
      name: "Rot",
      value: "#ff0000",
      products: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
// Mock für axios oder fetchGetCatalog, falls verwendet
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockCatalog })),
}));


const addDishes = jest.fn(); // Verwende jest.fn() für Mock-Funktionen in Tests
const removeItem = jest.fn();
const setCatalogData = jest.fn();

// Mock für den CatalogContext, falls benötigt
const mockUseCatalog = jest.fn();

describe('ProductForm', () => {
  it('sollte das Formular ohne Fehler rendern', async () => {
    render(
        <CatalogContext.Provider value={{
            catalog: mockCatalog, // Dein mockCatalog Objekt
            addDishes: addDishes,
            removeItem: removeItem,
            setCatalogData: setCatalogData,
          }}>
        <ProductForm initialData={mockInitialData} categories={mockCatalog} sizes={[]} colors={[]} itemId="test-item-id" />
      </CatalogContext.Provider>
    );

    expect(screen.getByText(/Create product/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });

  it('sollte ermöglichen, das Formular abzusenden', async () => {
    render(
        <CatalogContext.Provider value={{
            catalog: mockCatalog, // Dein mockCatalog Objekt
            addDishes: addDishes,
            removeItem: removeItem,
            setCatalogData: setCatalogData,
          }}>
        <ProductForm initialData={mockInitialData} categories={mockCatalog} sizes={[]} colors={[]} itemId="test-item-id" />
      </CatalogContext.Provider>
    );

    // Felder ausfüllen
    await userEvent.type(screen.getByPlaceholderText(/Product name/i), 'Test Produkt');
    await userEvent.type(screen.getByPlaceholderText(/Beschreibung des Gerichts/i), 'Beschreibung Test');

    // Formular absenden
    userEvent.click(screen.getByRole('button', { name: /Create/i }));

    await waitFor(() => {
      // Hier könnte man erwarten, dass eine Netzwerkanfrage abgesendet wurde oder eine Weiterleitung erfolgt ist
      // Beispiel: expect(mockAddDishOrItem).toHaveBeenCalledWith(erwarteterPayload);
    });
  });

});
