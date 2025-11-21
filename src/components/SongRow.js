import React from 'react';
import styled from 'styled-components';
import { useDataLayerValue } from '../context/DataLayer';

const SongRowContainer = styled.div`
  margin-right: 20px;
  padding: 16px;
  width: 180px;
  background-color: #181818;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #282828;
  }

  &:hover .play-button {
    opacity: 1;
    transform: translateY(0);
  }

  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  .song-info {
    h4 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 12px;
      color: #b3b3b3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .play-button {
    position: absolute;
    bottom: 90px;
    right: 16px;
    width: 48px;
    height: 48px;
    background-color: #1db954;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    
    span {
      font-size: 20px;
      color: black;
      margin-left: 2px;
    }
  }
`;

const LikeButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

function SongRow({ track }) {
  const [{ likedSongs = [] }, dispatch] = useDataLayerValue();

  const isLiked = likedSongs.some((song) => song.id === track.id);

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'TOGGLE_LIKE_SONG',
      song: track,
    });
  };

  const handlePlaySong = () => {
    dispatch({
      type: 'SET_ITEM',
      item: track,
    });
    // این خط جدید اضافه شد تا آدرس فایل صوتی تنظیم شود
    dispatch({
      type: 'SET_AUDIO_SRC',
      audioSrc: track.audioUrl, // آدرس صوتی از آبجکت تراک خوانده می‌شود
    });
    dispatch({
      type: 'SET_PLAYING',
      playing: true,
    });
  };

  return (
    <SongRowContainer onClick={handlePlaySong}>
      <LikeButton onClick={handleLike}>
        {isLiked ? '❤️' : '🤍'}
      </LikeButton>
      <img src={track.albumArt} alt={track.name} />
      <div className="song-info">
        <h4>{track.name}</h4>
        <p>{track.artist}</p>
      </div>
      <div className="play-button">
        <span>▶</span>
      </div>
    </SongRowContainer>
  );
}

export default SongRow;