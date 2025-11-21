import React from 'react';
import styled from 'styled-components';
import { useDataLayerValue } from '../context/DataLayer';
import { FiPlayCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CompactContainer = styled.div`
  background-color: #181818;
  border-radius: 8px;
  padding: 24px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const SeeAllLink = styled(Link)`
  color: #b3b3b3;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`;

const SongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CompactSongItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #282828;
    border-radius: 4px;
  }
`;

const SongImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-color: #282828;
`;

const SongInfo = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: 12px;
    color: #b3b3b3;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function LikedSongsCompact() {
  const [{ likedSongs }] = useDataLayerValue();

  // فقط ۳ آهنگ اول را برای نمایش فشرده‌شده نمایش می‌دهیم
  const topSongs = likedSongs.slice(0, 3);

  return (
    <CompactContainer>
      <Header>
        <Title>Made For You</Title>
        <SeeAllLink to="/liked-songs">See all</SeeAllLink>
      </Header>
      <SongList>
        {topSongs.map((song) => (
          <CompactSongItem key={song.id}>
            <SongImage src={song.albumArt} alt={song.name} />
            <SongInfo>
              <h4>{song.name}</h4>
              <p>{song.artist}</p>
            </SongInfo>
          </CompactSongItem>
        ))}
      </SongList>
    </CompactContainer>
  );
}

export default LikedSongsCompact;