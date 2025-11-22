import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.header`
  padding: 14px 28px;
  background-color: rgba(0,0,0,0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,255,255,0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const NavbarLeft = styled.div`
  display:flex;
  align-items:center;
  gap: 18px;
`;

const NavbarLogo = styled(Link)`
  font-size: 20px;
  font-weight: 900;
  color: white;
  text-decoration: none;
`;

const NavbarItems = styled.nav`
  display:flex;
  align-items:center;
  gap: 20px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavbarLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: color .14s ease;
  &:hover { color: #fff; }
`;

const NavbarRight = styled.div`
  display:flex;
  align-items:center;
  gap: 18px;

  @media (max-width: 640px) {
    gap: 10px;
  }
`;

const NavbarButton = styled.a`
  background-color: #fff;
  color: #000;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 700;
  text-decoration: none;

  @media (max-width: 640px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

/* دکمه موبایل برای باز کردن منو (MobileMenu) */
const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 640px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

function TopNavbar({ onOpenMobileMenu }) {
  return (
    <NavbarContainer role="navigation" aria-label="top navigation">
      <NavbarLeft>
        <NavbarLogo to="/">Spotify</NavbarLogo>
        <NavbarItems>
          <NavbarLink href="#">Premium</NavbarLink>
          <NavbarLink href="#">Download</NavbarLink>
        </NavbarItems>
      </NavbarLeft>

      <NavbarRight>
        <NavbarItems style={{ display: 'none' }} />
        <NavbarLink href="#" style={{ display: 'none' }}>placeholder</NavbarLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <NavbarLink href="#" style={{ display: 'none' }}>Sign up</NavbarLink>
          <NavbarButton href="#">Log in</NavbarButton>
          <MobileMenuButton aria-label="open menu" onClick={() => onOpenMobileMenu && onOpenMobileMenu()}>
            ☰
          </MobileMenuButton>
        </div>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default TopNavbar;
