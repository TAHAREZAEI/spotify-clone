import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiPlusSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // آیکون‌های جدید
import { useDataLayerValue } from '../context/DataLayer'; // import useDataLayerValue

import spotifyLogo from '../assets/Spotify_Primary_Logo_RGB_Black.png';

// استایل سایدبار برای حالت باز و بسته
const SidebarContainer = styled.div`
  flex: ${props => props.collapsed ? '0.08' : '0.2'};
  background-color: #000000;
  color: #b3b3b3;
  height: 100vh;
  padding: ${props => props.collapsed ? '12px 4px' : '24px 12px'};
  display: flex;
  flex-direction: column;
  gap: ${props => props.collapsed ? '8px' : '8px'};
  transition: flex 0.3s ease, padding 0.3s ease;

  .sidebar-logo {
    height: 24px;
    margin-bottom: 20px;
    cursor: pointer;
    filter: invert(1) grayscale(100%);
  }

  .sidebar-option {
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
  }

  .sidebar-option.active {
    color: white;
    background-color: #282828;
  }

  hr {
    border: 1px solid #282828;
    margin: 10px 0;
    width: 90%;
  }
`;

// استایل دکمه تغییر وضعیت
const ToggleButton = styled.div`
  color: #b3b3b3;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

function Sidebar() {
  const location = useLocation();
  const [{ sidebarCollapsed }, dispatch] = useDataLayerValue();

  return (
    <SidebarContainer collapsed={sidebarCollapsed}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!sidebarCollapsed && <img className="sidebar-logo" src={spotifyLogo} alt="Spotify Logo" />}
        <ToggleButton onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
          {sidebarCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </ToggleButton>
      </div>
      
      <Link to="/" className={`sidebar-option ${location.pathname === '/' ? 'active' : ''}`}>
        <FiHome size={24} />
        {/* متن فقط در حالت باز نمایش داده می‌شود */}
        {!sidebarCollapsed && <span>Home</span>}
      </Link>
      
      <Link to="/search" className={`sidebar-option ${location.pathname === '/search' ? 'active' : ''}`}>
        <FiSearch size={24} />
        {!sidebarCollapsed && <span>Search</span>}
      </Link>
      
      <Link to="/library" className={`sidebar-option ${location.pathname === '/library' ? 'active' : ''}`}>
        <FiBookOpen size={24} />
        {!sidebarCollapsed && <span>Your Library</span>}
      </Link>
      
      <hr />
      <div className="sidebar-option" onClick={() => dispatch({ type: 'OPEN_CREATE_PLAYLIST_MODAL' })}>
        <FiPlusSquare size={24} />
        {!sidebarCollapsed && <span>Create Playlist</span>}
      </div>
      <Link to="/liked-songs" className={`sidebar-option ${location.pathname === '/liked-songs' ? 'active' : ''}`}>
        <span style={{ marginRight: '8px' }}>❤️</span>
        {!sidebarCollapsed && <span>Liked Songs</span>}
      </Link>
    </SidebarContainer>
  );
}

export default Sidebar;