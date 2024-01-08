import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../components/SearchBox';
import '@testing-library/jest-dom';

test('renders SearchBox component with placeholder and value', () => {
  const placeholderText = 'Search here';
  const inputValue = 'Test Input';

  render(
    <SearchBox
      value={inputValue}
      onChange={() => {}}
      placeholder={placeholderText}
    />
  );

  const inputElement = screen.getByPlaceholderText(placeholderText);

  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe(inputValue);
});

test('triggers onChange function when input value changes', () => {
    const onChangeMock = jest.fn();
  
    render(<SearchBox value="" onChange={onChangeMock} />);
  
    const inputElement = screen.getByRole('textbox');
  
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
  
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.anything());  // You can simplify the expectation if you're not interested in the specific event structure
  });
  

  test('renders SearchBox component with custom className and style', () => {
    const customClassName = 'custom-search-box';
    const customStyle = { color: 'rgb(9, 10, 10)', fontSize: '16px' };
  
    render(<SearchBox className={customClassName} style={customStyle} />);
  
    const containerElement = screen.getByTestId('search-box-container');
  
    console.log(containerElement.style);  // Log the actual styles
  
    expect(containerElement).toHaveClass(customClassName);
    expect(containerElement).toHaveStyle({
      color: 'rgb(9, 10, 10)',
      fontSize: '16px',
    });
  });
  
  
  
  
  
  
  