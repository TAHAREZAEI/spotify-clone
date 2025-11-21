import React from 'react';
import styled from 'styled-components';

const CategoryCardContainer = styled.div`
  min-width: 180px;
  min-height: 120px;
  padding: 16px;
  background-color: ${props => props.color || '#282828'};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.color ? `${props.color}dd` : '#383838'};
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
    <CategoryCardContainer color={color}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
    </CategoryCardContainer>
  );
}

export default CategoryCard;