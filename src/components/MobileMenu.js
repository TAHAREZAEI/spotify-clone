import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiPlusSquare } from 'react-icons/fi';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #121212;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  
  @media (min-width: 769px) {
    display: none; /* منوی موبایل در صفحات بزرگ کاملاً مخفی می‌شود */
  }
`;
const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #282828;
  
  img {
    height: 30px;
    filter: invert(1) grayscale(100%);
  }
`;

const CloseButton = styled.div`
  color: #b3b3b3;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.2s;
  &:hover {
    color: white;
  }
`;

const MenuOption = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #b3b3b3;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
    background-color: #282828;
  }
`;

function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <MenuOverlay isOpen={isOpen}>
      <MenuHeader>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" alt="Spotify Logo" />
        <CloseButton onClick={onClose}>×</CloseButton>
      </MenuHeader>
      
      <MenuOption to="/" className={location.pathname === '/' ? 'active' : ''} onClick={onClose}>
        <FiHome size={24} />
        <span>Home</span>
      </MenuOption>
      
      <MenuOption to="/search" className={location.pathname === '/search' ? 'active' : ''} onClick={onClose}>
        <FiSearch size={24} />
        <span>Search</span>
      </MenuOption>
      
      <MenuOption to="/library" className={location.pathname === '/library' ? 'active' : ''} onClick={onClose}>
        <FiBookOpen size={24} />
        <span>Your Library</span>
      </MenuOption>
    </MenuOverlay>
  );
}

export default MobileMenu;