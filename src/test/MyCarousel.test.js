import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MyCarousel from '../components/MyCarousel';

describe('MyCarousel', () => {
    test('renders carousel with slides', () => {
        render(<MyCarousel />);
      
        // Check if the first slide is rendered
        const firstSlideImage = screen.getByAltText('Slide 1');
        expect(firstSlideImage).toBeInTheDocument();
      
        // Check if the header and text of the first slide are rendered
        const firstSlideHeader = screen.getByText('A Plan to Rebuild the Bus Terminal Everyone Loves to Hate 1');
        const firstSlideTextElements = screen.getAllByText('1h ago · by Troy Corlson');
      
        // Check if at least one element with the expected text is present
        expect(firstSlideHeader).toBeInTheDocument();
        expect(firstSlideTextElements.length).toBeGreaterThan(0);
      });
      

  test('handles previous and next buttons correctly', () => {
    render(<MyCarousel />);
  
    // Check if the first slide is initially active
    const firstSlideImage = screen.getByAltText('Slide 1');
    expect(firstSlideImage).toBeInTheDocument();
  
    // Check if the second slide is not initially active
    const secondSlideImage = screen.getByAltText('Slide 2');
    expect(secondSlideImage).not.toHaveClass('active');
  
    // Click the next button
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
  
    // Add a small delay before checking if the second slide becomes active
    setTimeout(() => {
      expect(secondSlideImage).toHaveClass('active');
    }, 100);
  });
  
});
