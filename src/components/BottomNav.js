import React from 'react';
import styled from 'styled-components';
import { FiHome, FiSearch, FiBookOpen, FiMoreHorizontal } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const BottomNavContainer = styled.div`
  /* فقط در صفحات بسیار کوچک نمایش داده می‌شود */
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;

  @media (max-width: 250px) {
    display: flex; /* نمایش در صفحات کوچک */
  }
`;

const NavItem = styled.div`
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
  
  span {
    font-size: 20px;
    margin-bottom: 4px;
  }
`;

function BottomNav() {
  const [, dispatch] = useDataLayerValue();

  return (
    <BottomNavContainer>
      <NavItem onClick={() => window.location.pathname !== '/' && (window.location.href = '/')}>
        <FiHome />
        <span>Home</span>
      </NavItem>
      <NavItem onClick={() => window.location.pathname !== '/search' && (window.location.href = '/search')}>
        <FiSearch />
        <span>Search</span>
      </NavItem>
      <NavItem onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}>
        <FiMoreHorizontal />
        <span>More</span>
      </NavItem>
    </BottomNavContainer>
  );
}

export default BottomNav;