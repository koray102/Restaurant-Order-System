// src/pages/__tests__/MenuPage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import MenuPage from '../MenuPage';
import '@testing-library/jest-dom/extend-expect';

// Gerekli mocklamaları yapıyoruz
jest.mock('../../components/menu/DishList', () => () => <div>DishList</div>);
jest.mock('../../components/menu/AddDishModal', () => () => <div>AddDishModal</div>);
jest.mock('../../components/menu/CartModal', () => () => <div>CartModal</div>);
jest.mock('../../components/menu/WaiterCall', () => () => <div>WaiterCall</div>);

describe('MenuPage', () => {
  beforeEach(() => {
    // Her testten önce localStorage mock verileri
    localStorage.setItem('userRole', 'customer');
    localStorage.setItem('selectedLocation', 'Bornova');
    localStorage.setItem('cart_Bornova', JSON.stringify([]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('başlık doğru görüntüleniyor', () => {
    render(<MenuPage />);
    const title = screen.getByText(/Vanilla Bornova/i);
    expect(title).toBeInTheDocument();
  });

  test('müşteri için WaiterCall bileşeni gösteriliyor', () => {
    render(<MenuPage />);
    expect(screen.getByText(/WaiterCall/i)).toBeInTheDocument();
  });

  test('personel için "Yemek Ekle" butonu gösteriliyor', () => {
    localStorage.setItem('userRole', 'staff');
    localStorage.setItem('staffLocation', 'Bostanli');
    render(<MenuPage />);
    expect(screen.getByText(/Yemek Ekle/i)).toBeInTheDocument();
  });

  test('Cart butonu müşteri için gösteriliyor', () => {
    render(<MenuPage />);
    expect(screen.getByText(/Cart \(0\)/i)).toBeInTheDocument();
  });
});
