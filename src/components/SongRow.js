import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';
import SongOptions from './SongOptions';

const SongRowContainer = styled.div`
   margin-right: 20px;
  padding: 16px;
  width: 180px;
  /* --- تغییرات کلیدی برای افکت شیشه‌ای --- */
  background-color: rgba(255, 255, 255, 0.05); /* پس‌زمینه سفید نیمه‌شفاف */
  backdrop-filter: blur(10px); /* افکت محو شدن */
  -webkit-backdrop-filter: blur(10px); /* برای مرورگر سافاری */
  border: 1px solid rgba(255, 255, 255, 0.1); /* حاشیه برای جداسازی */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* سایه برای عمق */
  /* --- پایان تغییرات --- */
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* در هاور کمی شفاف‌تر شود */
    transform: translateY(-2px); /* کمی به بالا بیاید */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
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
  font-size: 24px; /* به اندازه اصلی برگشت */
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// استایل برای دکمه سه نقطه
const OptionsButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 24px; /* به اندازه اصلی برگشت */
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