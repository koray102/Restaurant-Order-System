import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddDishModal from '../AddDishModal';

describe('AddDishModal Component', () => {
  const defaultProps = {
    newDish: {
      name: '',
      description: '',
      price: '',
      image: '',
    },
    setNewDish: jest.fn(),
    onClose: jest.fn(),
    onAdd: jest.fn(),
  };

  test('renders modal inputs and title', () => {
    render(<AddDishModal {...defaultProps} />);

    expect(screen.getByText('Add New Dish')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Dish Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price (₺)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Image URL')).toBeInTheDocument();
  });

  test('calls onClose when Cancel is clicked', () => {
    render(<AddDishModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('calls onAdd when Add Dish is clicked', () => {
    render(<AddDishModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Add Dish'));
    expect(defaultProps.onAdd).toHaveBeenCalled();
  });
});
