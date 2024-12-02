import React from 'react';
import './styles/header.css';

type CarouselProps = {
  totalSlides: number;
  onSlideChange: (index: number) => void;
  atual: number;
};

const Header: React.FC<CarouselProps> = ({ totalSlides, onSlideChange, atual }) => {
  const handlePrev = () => {
    const newIndex = atual === 0 ? totalSlides - 1 : atual - 1;
    onSlideChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = atual === totalSlides - 1 ? 0 : atual + 1;
    onSlideChange(newIndex);
  };

  return (
    <div className="carousel">
      {atual !== 0 && (
        <button className="arrow left" onClick={handlePrev}>
          {"❮"}
        </button>
      )}
      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === atual ? 'active' : ''}`}
            onClick={() => onSlideChange(index)}
          ></span>
        ))}
      </div>
      {atual !== totalSlides - 1 && (
        <button className="arrow right" onClick={handleNext}>
          {"❯"}
        </button>
      )}
    </div>
  );
};

export default Header;
