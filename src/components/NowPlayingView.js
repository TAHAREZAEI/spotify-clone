// src/components/NowPlayingView.js

import React from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiSkipBack, FiSkipForward, FiPlay, FiPause } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const NowPlayingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #2d3436, #000000);
  z-index: 9999;
  display: flex;
  flex-direction: column; /* چیدمان عمودی */
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end; /* دکمه بستن را به سمت راست می‌برد */
  align-items: center;
  padding: 15px 20px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

// این بخش محتوای اصلی (عکس و متن) را در خود جای می‌دهد
const MainContent = styled.div`
  flex-grow: 1; /* این بخش تمام فضای خالی بین هدر و کنترل‌ها را پر می‌کند */
  display: flex;
  flex-direction: column;
  justify-content: center; /* محتوا را در وسط این بخش عمودی قرار می‌دهد */
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const AlbumArt = styled.img`
  width: 80%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  margin-bottom: 30px;
`;

const SongTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin: 0;
`;

const ArtistName = styled.p`
  font-size: 16px;
  color: #b3b3b3;
  margin-top: 8px;
`;

// این بخش کنترل‌ها را در پایین صفحه نگه می‌دارد
const ControlsContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); }
`;

const PlayPauseButton = styled(ControlButton)`
  background-color: #1db954;
  color: black;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function NowPlayingView() {
  const [{ item, playing }, dispatch] = useDataLayerValue();

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_NOW_PLAYING_VIEW' });
  };

  const handlePlayPause = () => {
    dispatch({ type: 'SET_PLAYING', playing: !playing });
  };

  if (!item) {
    return null;
  }

  return (
    <NowPlayingContainer>
      <Header>
        <CloseButton onClick={handleClose}>
          <FiChevronDown size={32} />
        </CloseButton>
      </Header>

      <MainContent>
        <AlbumArt src={item.albumArt} alt={item.name} />
        <SongTitle>{item.name}</SongTitle>
        <ArtistName>{item.artist}</ArtistName>
      </MainContent>

      <ControlsContainer>
        <Controls>
          <ControlButton>
            <FiSkipBack size={24} />
          </ControlButton>
          <PlayPauseButton onClick={handlePlayPause}>
            {playing ? <FiPause size={24} /> : <FiPlay size={24} />}
          </PlayPauseButton>
          <ControlButton>
            <FiSkipForward size={24} />
          </ControlButton>
        </Controls>
      </ControlsContainer>
    </NowPlayingContainer>
  );
}

export default NowPlayingView;