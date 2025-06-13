/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../LoginPage';

// react-router-dom'dan useNavigate'i mock'la
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  // Her testten önce localStorage'ı temizle
  localStorage.clear();
});

describe('LoginPage Component', () => {
  test('giriş sayfası render ediliyor', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test('doğru bilgilerle giriş yapılınca navigate ve localStorage çalışıyor', () => {
    render(<LoginPage />);

    // inputlara değer yaz
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'bornova1' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123456' },
    });

    // butona tıkla
    fireEvent.click(screen.getByText(/login/i));

    // localStorage kontrol
    expect(localStorage.getItem('userRole')).toBe('bornova1');
    expect(localStorage.getItem('selectedLocation')).toBe('Bornova');

    // yönlendirme kontrol
    expect(mockedNavigate).toHaveBeenCalledWith('/menu');
  });

  test('hatalı bilgilerle giriş yapılınca alert gösteriliyor', () => {
    // window.alert'i mockla
    window.alert = jest.fn();

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'invalid' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByText(/login/i));

    expect(window.alert).toHaveBeenCalledWith('Geçersiz kullanıcı adı veya şifre!');
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
