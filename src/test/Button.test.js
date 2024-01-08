// Button.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button';

test('renders a button with label', () => {
  render(<Button label="Click me" />);
  const button = screen.getByText('Click me');
  expect(button).toBeInTheDocument();
});

test('renders a link with label and "to" prop', () => {
    render(
      <BrowserRouter>
        <Button type="link" label="Go to Page" to="/page" />
      </BrowserRouter>
    );
    const link = screen.getByText('Go to Page');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/page');
  });
test('triggers onClick function when button is clicked', () => {
  const onClickMock = jest.fn();
  render(<Button label="Click me" onClick={onClickMock} />);
  const button = screen.getByText('Click me');
  fireEvent.click(button);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
