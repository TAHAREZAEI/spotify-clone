import React from 'react';
import styled from 'styled-components';

const CategoryCardContainer = styled.div`
  min-width: 180px;
  min-height: 120px;
  padding: 16px;
  /* --- افکت شیشه‌ای --- */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* --- پایان افکت --- */
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }

  img {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    opacity: 0.8;
    transform: rotate(25deg);
  }

  h4 {
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    position: relative;
    z-index: 1;
  }
`;

function CategoryCard({ name, color, image }) {
  return (
    <CategoryCardContainer>
      <img src={image} alt={name} />
      <h4>{name}</h4>
    </CategoryCardContainer>
  );
}

export default CategoryCard;