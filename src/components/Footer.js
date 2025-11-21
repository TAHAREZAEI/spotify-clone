import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.div`
  /* تغییرات کلیدی برای افکت شیشه‌ای */
  background-color: rgba(40, 40, 40, 0.7); /* کمی شفاف */
  backdrop-filter: blur(10px); /* افکت مات */
  -webkit-backdrop-filter: blur(10px); /* برای سافاری */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 32px 32px;
  color: #b3b3b3;
  font-size: 13px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterTitle = styled.h4`
  color: white;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const FooterLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 13px;
  font-weight: 400;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #404040;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  font-size: 18px;
`;

const SocialIcon = styled.a`
  color: #b3b3b3;
  transition: color 0.2s;
  &:hover {
    color: white;
  }
`;

const RegionSelector = styled.select`
  background-color: transparent;
  border: 1px solid #878787;
  color: #b3b3b3;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterColumn>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Jobs</FooterLink>
          <FooterLink href="#">For The Record</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Communities</FooterTitle>
          <FooterLink href="#">For Artists</FooterLink>
          <FooterLink href="#">Developers</FooterLink>
          <FooterLink href="#">Advertising</FooterLink>
          <FooterLink href="#">Investors</FooterLink>
          <FooterLink href="#">Vendors</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Useful links</FooterTitle>
          <FooterLink href="#">Support</FooterLink>
          <FooterLink href="#">Free Mobile App</FooterLink>
        </FooterColumn>
      </FooterGrid>

      <FooterBottom>
        <SocialIcons>
          <SocialIcon href="#"><FaFacebookF /></SocialIcon>
          <SocialIcon href="#"><FaInstagram /></SocialIcon>
          <SocialIcon href="#"><FaTwitter /></SocialIcon>
        </SocialIcons>
        <RegionSelector>
          <option>English</option>
          <option>Français</option>
          <option>Deutsch</option>
        </RegionSelector>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;