import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi'; // آیکون سه نقطه
import { useDataLayerValue } from '../context/DataLayer';
import SongOptions from './SongOptions'; // import کامپوننت منو

const SongRowContainer = styled.div`
  margin-right: 20px;
  padding: 12px; <!-- از 16px به 12px تغییر دهید -->
  width: 160px; <!-- از 180px به 160px تغییر دهید -->
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
    margin-bottom: 8px; <!-- از 12px به 8px تغییر دهید -->
  }

  .song-info {
    h4 {
      font-size: 13px; <!-- از 14px به 13px تغییر دهید -->
      font-weight: 600;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 11px; <!-- از 12px به 11px تغییر دهید -->
      color: #b3b3b3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .play-button {
    position: absolute;
    bottom: 80px; <!-- از 90px به 80px تغییر دهید -->
    right: 16px;
    width: 40px; <!-- از 48px به 40px تغییر دهید -->
    height: 40px; <!-- از 48px به 40px تغییر دهید -->
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
      font-size: 18px; <!-- از 20px به 18px تغییر دهید -->
      color: black;
      margin-left: 2px;
    }
  }
`;

// ... استایل‌های LikeButton و OptionsButton را هم کمی کوچک کنید
const LikeButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px; <!-- از 24px به 20px تغییر دهید -->
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const OptionsButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 20px; <!-- از 24px به 20px تغییر دهید -->
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;
  padding: 4px;
  border-radius: 50%;

  &:hover {
    opacity: 1;
    background-color: rgba(0,0,0,0.5);
  }
`;

function SongRow({ track }) {
  const [{ likedSongs = [] }, dispatch] = useDataLayerValue();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const isLiked = likedSongs.some((song) => song.id === track.id);

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_LIKE_SONG', song: track });
  };

  const handlePlaySong = () => {
    dispatch({ type: 'SET_ITEM', item: track });
    dispatch({ type: 'SET_AUDIO_SRC', audioSrc: track.audioUrl });
    dispatch({ type: 'SET_PLAYING', playing: true });
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    dispatch({ type: 'OPEN_SELECT_PLAYLIST_MODAL', song: track });
    setShowOptions(false);
  };

  // برای بستن منو با کلیک در بیرون از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <SongRowContainer onClick={handlePlaySong}>
      <div ref={optionsRef} style={{ position: 'relative' }}>
        <OptionsButton onClick={(e) => { e.stopPropagation(); setShowOptions(!showOptions); }}>
          <FiMoreVertical />
        </OptionsButton>
        {showOptions && <SongOptions onAddToPlaylist={handleAddToPlaylist} />}
      </div>
      
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