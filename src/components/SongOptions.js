// src/components/SongOptions.js

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
  min-width: 180px;
`;

const OptionButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3; /* رنگ متن پیش‌فرض */
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: #fff; /* رنگ متن در حالت هاور */
    background-color: rgba(255, 255, 255, 0.1); /* پس‌زمینه در حالت هاور */
  }
`;

// یک خط جداکننده برای زیبایی
const Separator = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
`;

function SongOptions({ 
  onAddToPlaylist, 
  onGoToArtist, 
  onGoToAlbum, 
  onShare 
}) {
  return (
    <OptionsContainer>
      <OptionButton onClick={onAddToPlaylist}>
        Add to Playlist
      </OptionButton>
      <Separator />
      <OptionButton onClick={onGoToArtist}>
        Go to Artist
      </OptionButton>
      <OptionButton onClick={onGoToAlbum}>
        Go to Album
      </OptionButton>
      <Separator />
      <OptionButton onClick={onShare}>
        Share
      </OptionButton>
    </OptionsContainer>
  );
}

export default SongOptions;