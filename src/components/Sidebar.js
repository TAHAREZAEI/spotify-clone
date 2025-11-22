import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiPlusSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

import spotifyLogo from '../assets/Spotify_Primary_Logo_RGB_Black.png';

const SidebarContainer = styled.aside`
  flex: 0 0 18%;
  min-width: 200px;
  max-width: 320px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  color: #b3b3b3;
  height: 100vh;
  padding: ${props => props.collapsed ? '12px 6px' : '24px 14px'};
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.28s ease;

  /* tablet */
  @media (max-width: 1024px) {
    flex: 0 0 20%;
    min-width: 160px;
  }

  /* موبایل: مخفی (MobileMenu مسئول نمایش) */
  @media (max-width: 768px) {
    display: none;
  }

  .sidebar-logo {
    height: 28px;
    margin-bottom: 18px;
    cursor: pointer;
    filter: invert(1) grayscale(100%);
    object-fit: contain;
  }

  .sidebar-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #b3b3b3;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color .18s, color .18s, transform .18s;
    text-decoration: none;

    svg { flex-shrink: 0; }

    &:hover {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.04);
      transform: translateX(4px);
    }
  }

  .sidebar-option.active {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.08);
  }

  hr {
    border: none;
    height: 1px;
    background: rgba(255,255,255,0.04);
    margin: 12px 0;
    width: 90%;
  }

  /* اگر collapsed بود متن‌ها را مخفی کن (برای دسکتاپ کوچک) */
  ${props => props.collapsed && `
    .sidebar-option span { display: none; }
    .sidebar-logo { display: none; }
    padding: 12px 8px;
    min-width: 72px;
    max-width: 96px;
  `}
`;

const ToggleButton = styled.button`
  color: #b3b3b3;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  background: transparent;
  border: none;
  display:flex;
  align-items:center;
  justify-content:center;

  &:hover { color: #fff; transform: scale(1.03); }
`;

function Sidebar() {
  const location = useLocation();
  const [{ sidebarCollapsed }, dispatch] = useDataLayerValue();

  return (
    <SidebarContainer collapsed={sidebarCollapsed} aria-label="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!sidebarCollapsed && <img className="sidebar-logo" src={spotifyLogo} alt="Spotify Logo" />}
        <ToggleButton
          aria-label={sidebarCollapsed ? 'expand sidebar' : 'collapse sidebar'}
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        >
          {sidebarCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </ToggleButton>
      </div>

      <Link to="/" className={`sidebar-option ${location.pathname === '/' ? 'active' : ''}`}>
        <FiHome size={20} />
        {!sidebarCollapsed && <span>Home</span>}
      </Link>

      <Link to="/search" className={`sidebar-option ${location.pathname === '/search' ? 'active' : ''}`}>
        <FiSearch size={20} />
        {!sidebarCollapsed && <span>Search</span>}
      </Link>

      <Link to="/library" className={`sidebar-option ${location.pathname === '/library' ? 'active' : ''}`}>
        <FiBookOpen size={20} />
        {!sidebarCollapsed && <span>Your Library</span>}
      </Link>

      <hr />

      <div
        role="button"
        tabIndex={0}
        className="sidebar-option"
        onClick={() => dispatch({ type: 'OPEN_CREATE_PLAYLIST_MODAL' })}
        onKeyDown={(e) => (e.key === 'Enter' && dispatch({ type: 'OPEN_CREATE_PLAYLIST_MODAL' }))}
      >
        <FiPlusSquare size={20} />
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
