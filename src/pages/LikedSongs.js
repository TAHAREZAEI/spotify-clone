import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import { useDataLayerValue } from '../context/DataLayer';

const LikedSongsHeader = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(to bottom, #450af5, #121212);
  border-radius: 8px;
  margin-bottom: 24px;

  .header-icon {
    font-size: 80px;
    margin-right: 20px;
    background: linear-gradient(to bottom, #450af5, #121212);
    padding: 20px;
    border-radius: 50%;
  }

  .header-text {
    h1 {
      font-size: 72px;
      font-weight: 900;
      margin: 0;
    }
    p {
      font-size: 16px;
      font-weight: 600;
      color: #b3b3b3;
    }
  }
`;

const LikedSongsContainer = styled.div`
  flex-grow: 1;
  background-color: #121212;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function LikedSongs() {
  // حتما مقدار پیش‌فرض [] رو اینجا هم قرار بده
  // در تابع LikedSongs
const [{ likedSongs = [] }] = useDataLayerValue();

  return (
    <LikedSongsContainer>
      <LikedSongsHeader>
        <div className="header-icon">❤️</div>
        <div className="header-text">
          <h1>Liked Songs</h1>
          <p>{likedSongs.length} liked songs</p>
        </div>
      </LikedSongsHeader>
      
      {likedSongs.length > 0 && <Section title="" items={likedSongs} />}
    </LikedSongsContainer>
  );
}

export default LikedSongs;