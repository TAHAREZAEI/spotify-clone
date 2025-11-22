import React from 'react';
import styled from 'styled-components';

const CategoryCardContainer = styled.div`
    flex: 1 1 180px; /* اجازه میده کارت‌ها جمع و جور بشن */
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

  &:hover { transform: scale(1.05); }

  img {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    opacity: 0.8;
    transform: rotate(25deg);

    @media (max-width: 480px) {
      width: 70px;
      height: 70px;
      bottom: -10px;
      right: -10px;
    }
  }

  h4 {
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    position: relative;
    z-index: 1;

    @media (max-width: 480px) {
      font-size: 16px;
    }
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