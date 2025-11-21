import React from 'react';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 16px;
  background-color: #282828;
  border-radius: 4px;
  padding: 8px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const OptionButton = styled.button`
  background: none;
  border: none;
  color: white; <!-- از #b3b3b3 به white تغییر دهید -->
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: color 0.2s;

  &:hover {
    color: #b3b3b3; <!-- هاور را کمی کمرنگ کنید تا تفاوت مشخص باشد -->
  }
`;

function SongOptions({ onAddToPlaylist }) {
  return (
    <OptionsContainer>
      <OptionButton onClick={onAddToPlaylist}>Add to Playlist</OptionButton>
    </OptionsContainer>
  );
}

export default SongOptions;