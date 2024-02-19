import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCartItem from '../components/ShoppingCartItems';

const mockItem = {
  title: 'Test Item',
  price: 10,
  quantity: 2,
};

test('ShoppingCartItem is rendered correctly', () => {
  // Render the ShoppingCartItem with mock props
  render(
    <ShoppingCartItem
      item={mockItem}
      onDelete={() => {}}
      onQuantityChange={() => {}}
    />
  );

  // Check if the item title, price, and quantity are rendered correctly
  const itemTitleElement = screen.getByText(mockItem.title);
  expect(itemTitleElement).toBeDefined();

  const itemPriceElement = screen.getByText(`${mockItem.price.toFixed(2)}€`);
  expect(itemPriceElement).toBeDefined();

  const itemQuantityElement = screen.getByText(mockItem.quantity.toString());
  expect(itemQuantityElement).toBeDefined();
});

test('Increase and decrease quantity buttons work correctly', () => {
  let quantity = mockItem.quantity;
  const handleQuantityChange = (newQuantity: number) => {
    quantity = newQuantity;
  };

  // Render the ShoppingCartItem with mock props and event handlers
  render(
    <ShoppingCartItem
      item={mockItem}
      onDelete={() => {}}
      onQuantityChange={handleQuantityChange}
    />
  );

  // Find and click the increase quantity button
  const increaseButton = screen.getByText('+');
  fireEvent.click(increaseButton);
  expect(quantity).toBe(mockItem.quantity + 1);

  // Find and click the decrease quantity button
  const decreaseButton = screen.getByText('-');
  fireEvent.click(decreaseButton);
  expect(quantity).toBe(mockItem.quantity - 1)
});
