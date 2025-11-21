import React from 'react';
import styled from 'styled-components';

const LibraryItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #282828;
  }

  img {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    background-color: #282828;
  }

  .item-info {
    color: #b3b3b3;
    
    .item-name {
      color: white;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }
    
    .item-type {
      font-size: 12px;
    }
  }
`;

function LibraryItem({ image, name, type }) {
  return (
    <LibraryItemContainer>
      <img src={image} alt={name} />
      <div className="item-info">
        <p className="item-name">{name}</p>
        <p className="item-type">{type}</p>
      </div>
    </LibraryItemContainer>
  );
}

export default LibraryItem;