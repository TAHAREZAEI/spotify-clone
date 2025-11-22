import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { FiSearch } from 'react-icons/fi';

// تصاویر خودتان را اینجا import کنید
import a from '../assets/a.jpg';
import aa from '../assets/aa.jpg';
import qq from '../assets/qq.jpg';
import sa from '../assets/sa.jpg';
import ss from '../assets/ss.jpg';
import imagesJpg from '../assets/images.jpg';

const categoriesData = [
  { id: 1, name: 'Pop', color: '#FF6B6B', image: a, slug: 'pop' },
  { id: 2, name: 'Hip-Hop', color: '#4ECDC4', image: aa, slug: 'hip-hop' },
  { id: 3, name: 'Rock', color: '#45B7D1', image: qq, slug: 'rock' },
  { id: 4, name: 'Dance/Electronic', color: '#96CEB4', image: sa, slug: 'dance-electronic' },
  { id: 5, name: 'Podcasts', color: '#DDA0DD', image: ss, slug: 'podcasts' },
  { id: 6, name: 'Mood', color: '#F7DC6F', image: imagesJpg, slug: 'mood' },
];

const SearchContainer = styled.div`
  flex-grow: 1;
  background-color: #121212;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);

  @media (max-width: 768px) {
    padding: 16px;
    height: calc(100vh - 84px);
  }

  @media (max-width: 640px) {
    padding: 12px;
    height: calc(100vh - 74px);
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #242424;
  border-radius: 500px;
  padding: 4px 20px;
  max-width: 400px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 16px 0;
  }

  @media (max-width: 480px) {
    padding: 4px 16px;
  }
  
  input {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    width: 100%;
    outline: none;
    margin-left: 12px;

    @media (max-width: 480px) {
      font-size: 14px;
      margin-left: 8px;
    }

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
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    margin-top: 32px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 24px;
  }
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const LinkWrapper = styled(Link)`
  text-decoration: none;
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
          <LinkWrapper key={category.id} to={`/search/${category.slug}`}>
            <CategoryCard
              name={category.name}
              color={category.color}
              image={category.image}
            />
          </LinkWrapper>
        ))}
      </CategoriesGrid>
    </SearchContainer>
  );
}

export default Search;