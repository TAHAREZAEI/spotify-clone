import React from 'react';
import styled from 'styled-components';
// مطمئن شو Link و useLocation import شده باشن
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiPlusSquare } from 'react-icons/fi';

const SidebarContainer = styled.div`
  flex: 0.2;
  background-color: #000000;
  color: #b3b3b3;
  height: 100vh;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .sidebar-logo {
    height: 50px;
    margin-bottom: 20px;
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
    text-decoration: none; /* این خط خیلی مهمه */

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

function Sidebar() {
  const location = useLocation();

  return (
    <SidebarContainer>
      <img
        className="sidebar-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        alt="Spotify Logo"
      />
      
      <Link to="/" className={`sidebar-option ${location.pathname === '/' ? 'active' : ''}`}>
        <FiHome size={24} />
        <span>Home</span>
      </Link>
      
      <Link to="/search" className={`sidebar-option ${location.pathname === '/search' ? 'active' : ''}`}>
        <FiSearch size={24} />
        <span>Search</span>
      </Link>
      
      <Link to="/library" className={`sidebar-option ${location.pathname === '/library' ? 'active' : ''}`}>
        <FiBookOpen size={24} />
        <span>Your Library</span>
      </Link>
      
      <hr />
      <div className="sidebar-option">
        <FiPlusSquare size={24} />
        <span>Create Playlist</span>
      </div>
      {/* اینجا باید از Link استفاده می‌کردید، نه div */}
      <Link to="/liked-songs" className={`sidebar-option ${location.pathname === '/liked-songs' ? 'active' : ''}`}>
        <span style={{ marginRight: '8px' }}>❤️</span>
        <span>Liked Songs</span>
      </Link>
    </SidebarContainer>
  );
}

export default Sidebar;