import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryCard from '../components/CategoryCard';
import { FiSearch } from 'react-icons/fi';

const categoriesData = [
  { id: 1, name: 'Pop', color: '#FF6B6B', image: 'https://i.scdn.co/image/ab67616d0000b2735b1c71f9d2a761437' },
  { id: 2, name: 'Hip-Hop', color: '#4ECDC4', image: 'https://i.scdn.co/image/ab67616d0000b2734716a0e0a1e0d1f3e8e6b4f6' },
  { id: 3, name: 'Rock', color: '#45B7D1', image: 'https://i.scdn.co/image/ab67616d0000b2736a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 4, name: 'Dance/Electronic', color: '#96CEB4', image: 'https://i.scdn.co/image/ab67616d0000b2737a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 5, name: 'Podcasts', color: '#DDA0DD', image: 'https://i.scdn.co/image/ab67616d0000b2738a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 6, name: 'Mood', color: '#F7DC6F', image: 'https://i.scdn.co/image/ab67616d0000b2739a9b8e8e0a1e0d1f3e8e6b4f6' },
];

const SearchContainer = styled.div`
  flex-grow: 1;
  background-color: #121212;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #242424;
  border-radius: 500px;
  padding: 4px 20px;
  max-width: 400px;
  margin: 20px 0;
  
  input {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    width: 100%;
    outline: none;
    margin-left: 12px;

    &::placeholder {
      color: #b3b3b3;
    }
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

function Search() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <SearchContainer>
      <SectionTitle>Browse all</SectionTitle>
      
      <SearchBarContainer>
        <FiSearch color="#b3b3b3" size={20} />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </SearchBarContainer>

      <CategoriesGrid>
        {categoriesData.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            color={category.color}
            image={category.image}
          />
        ))}
      </CategoriesGrid>
    </SearchContainer>
  );
}

export default Search;