import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  /* --- تغییرات کلیدی برای ثابت و شیشه‌ای بودن --- *  /* --- تغییرات کلیدی: position حذف شد --- */
  padding: 16px 32px;
  background-color: rgba(0, 0, 0, 0.5); /* افکت شیشه‌ای */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* z-index دیگر نیازی نیست چون ثابت نیست */
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

const NavbarItems = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
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

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
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
        <NavbarItems>
          <NavbarLink href="#">Premium</NavbarLink>
          <NavbarLink href="#">Download</NavbarLink>
        </NavbarItems>
      </NavbarLeft>
      <NavbarRight>
        <NavbarLink href="#">Sign up</NavbarLink>
        <NavbarButton href="#">Log in</NavbarButton>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default TopNavbar;