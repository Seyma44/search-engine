import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import slideImage from '../assets/slider.png';
import '../styles/Carousel.scss';

const slidesData = [
  {
    key: 1,
    image: slideImage,
    header: 'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate 1',
    text: '1h ago · by Troy Corlson',
  },
  {
    key: 2,
    image: slideImage,
    header: 'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate 2',
    text: '1h ago · by Troy Corlson',
  },
  {
    key: 3,
    image: slideImage,
    header: 'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate 3',
    text: '1h ago · by Troy Corlson',
  },
  {
    key: 4,
    image: slideImage,
    header: 'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate 4',
    text: '1h ago · by Troy Corlson',
  },
  {
    key: 5,
    image: slideImage,
    header: 'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate 5',
    text: '1h ago · by Troy Corlson',
  },
];

const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
    <div className="card-slider-container">
      <div
        className="card-slider"
        style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
      >
        {slidesData.map((slide, index) => (
          <div
            key={slide.key}
            className={`card ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={slide.image} alt={`Slide ${slide.key}`} />
            <div className="card-content">
              <div className="slider-text">
                <h2>{slide.header}</h2>
                <p>{slide.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
    <button className="prev-btn" onClick={handlePrev} data-testid="prev-button">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="next-btn" onClick={handleNext}  data-testid="next-button">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      </div>
    </>
  );
};

export default MyCarousel;
