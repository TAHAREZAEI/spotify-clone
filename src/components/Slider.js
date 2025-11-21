import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 80%;
  /* --- تغییرات کلیدی برای کوچک کردن --- */
  height: 300px; /* ارتفاع را از 400px به 300px کاهش دادم */
  overflow: hidden; /* این خط بسیار مهم است */
  border-radius: 8px;
  margin-bottom: 24px;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* این پراپرتی تصویر را بدون تغییر نسبت، تمام کادر را پر می‌کند */
  border-radius: 8px;
  transition: opacity 0.5s ease-in-out;
`;

const SlideText = styled.div`
  position: absolute;
  bottom: 40px;
  left: 32px;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  
  h1 {
    font-size: 48px;
    font-weight: 900;
    margin: 0;
  }
  
  p {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

function Slider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // هر 5 ثانیه عوض می‌شود

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <SliderContainer>
      <SlideImage src={slides[currentSlide].image} alt={slides[currentSlide].title} />
      <SlideText>
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].subtitle}</p>
      </SlideText>
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
}

export default Slider;