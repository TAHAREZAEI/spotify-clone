import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiX } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: flex-start;
`;

const MenuContainer = styled.nav`
  width: 280px;
  height: 100%;
  background-color: #121212;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
    padding: 20px;
  }

  @media (max-width: 360px) {
    padding: 16px;
    gap: 20px;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MenuTitle = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuOption = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #b3b3b3;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 4px;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 10px 0;
    gap: 14px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #282828;
  width: 100%;
  margin: 8px 0;
`;

const PlaylistSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #404040;
    border-radius: 3px;
  }
`;

function MobileMenu({ isOpen, onClose }) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <MenuOverlay isOpen={isOpen} onClick={onClose}>
      <MenuContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <MenuHeader>
          <MenuTitle>Menu</MenuTitle>
          <CloseButton onClick={onClose}>
            <FiX size={20} />
          </CloseButton>
        </MenuHeader>
        
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
        
        <Divider />

        <MenuOption to="/liked-songs" onClick={onClose}>
          <span style={{ marginRight: '8px' }}>❤️</span>
          Liked Songs
        </MenuOption>

        <Divider />

        <PlaylistSection>
          {playlists.map(playlist => (
            <MenuOption key={playlist.id} to={`/playlist/${playlist.id}`} onClick={onClose}>
              {playlist.name}
            </MenuOption>
          ))}
        </PlaylistSection>
      </MenuContainer>
    </MenuOverlay>
  );
}

export default MobileMenu;