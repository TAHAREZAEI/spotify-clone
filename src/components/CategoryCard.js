import React from 'react';
import styled from 'styled-components';

const CategoryCardContainer = styled.div`
  flex: 1 1 180px;
  max-width: 250px;
  min-height: 120px;
  padding: 16px;
  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover { 
    transform: scale(1.05); 
    background-color: rgba(255,255,255,0.15);
  }

  @media (max-width: 768px) {
    min-height: 100px;
    padding: 14px;
  }

  @media (max-width: 480px) {
    min-height: 80px;
    padding: 12px;
    max-width: none;
  }

  img {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    opacity: 0.8;
    transform: rotate(25deg);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
      bottom: -15px;
      right: -15px;
    }

    @media (max-width: 480px) {
      width: 70px;
      height: 70px;
      bottom: -10px;
      right: -10px;
    }
  }

  &:hover img {
    transform: rotate(25deg) scale(1.1);
  }

  h4 {
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 15px;
    }
  }
`;

function CategoryCard({ name, color, image }) {
  return (
    <CategoryCardContainer style={{ backgroundColor: color }}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
    </CategoryCardContainer>
  );
}

export default CategoryCard;