import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PaginationButtons from '../components/PaginationButtons';

describe('PaginationButtons', () => {
  test('renders button with label', () => {
    const label = 'Page 1';
    const onClick = jest.fn();
    const isSelected = false;

    render(<PaginationButtons label={label} onClick={onClick} isSelected={isSelected} />);

    const button = screen.getByText(label);
    expect(button).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const label = 'Page 2';
    const onClick = jest.fn();
    const isSelected = false;

    render(<PaginationButtons label={label} onClick={onClick} isSelected={isSelected} />);

    const button = screen.getByText(label);
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('applies selected class when isSelected is true', () => {
    const label = 'Page 3';
    const onClick = jest.fn();
    const isSelected = true;

    render(<PaginationButtons label={label} onClick={onClick} isSelected={isSelected} />);

    const button = screen.getByText(label);
    expect(button).toHaveClass('selected-page');
  });

  test('applies current class when isSelected is false', () => {
    const label = 'Page 4';
    const onClick = jest.fn();
    const isSelected = false;

    render(<PaginationButtons label={label} onClick={onClick} isSelected={isSelected} />);

    const button = screen.getByText(label);
    expect(button).toHaveClass('current-page');
  });
});
