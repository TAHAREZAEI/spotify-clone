// src/components/MobileMenu.js

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiPlusSquare } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  display: flex;
  /* منو را بر اساس prop باز یا بسته می‌کنیم */
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
`;

const MenuContainer = styled.nav`
  width: 280px;
  height: 100%;
  background-color: #121212;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MenuHeader = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

const MenuOption = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #b3b3b3;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0;
  border-radius: 4px;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  color: #b3b3b3;
  font-size: 24px;
  cursor: pointer;
`;

function MobileMenu({ isOpen, onClose }) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <MenuOverlay isOpen={isOpen}>
      <MenuContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <MenuHeader>Menu</MenuHeader>
        
        <MenuOption to="/" onClick={onClose}>
          <FiHome size={20} />
          Home
        </MenuOption>
        <MenuOption to="/search" onClick={onClose}>
          <FiSearch size={20} />
          Search
        </MenuOption>
        <MenuOption to="/library" onClick={onClose}>
          <FiBookOpen size={20} />
          Your Library
        </MenuOption>
        
        <hr style={{ border: '1px solid #282828', width: '100%' }} />

        <MenuOption to="/liked-songs" onClick={onClose}>
          <span style={{ marginRight: '8px' }}>❤️</span>
          Liked Songs
        </MenuOption>

        {playlists.map(playlist => (
          <MenuOption key={playlist.id} to={`/playlist/${playlist.id}`} onClick={onClose}>
            {playlist.name}
          </MenuOption>
        ))}

      </MenuContainer>
    </MenuOverlay>
  );
}

export default MobileMenu;