import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  z-index: 999; /* بالاتر از سایدبار */
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarLogo = styled(Link)`
  font-size: 24px;
  font-weight: 900;
  color: white;
  text-decoration: none;
  margin-right: 24px;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavbarLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const NavbarButton = styled(NavbarLink)`
  background-color: white;
  color: black;
  padding: 10px 32px;
  border-radius: 20px;
  font-weight: 700;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function TopNavbar() {
  return (
    <NavbarContainer>
      <NavbarLeft>
        <NavbarLogo to="/">Spotify</NavbarLogo>
        <NavbarLink href="#">Premium</NavbarLink>
        <NavbarLink href="#">Support</NavbarLink>
        <NavbarLink href="#">Download</NavbarLink>
      </NavbarLeft>
      <NavbarRight>
        <NavbarLink href="#">Sign up</NavbarLink>
        <NavbarButton href="#">Log in</NavbarButton>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default TopNavbar;