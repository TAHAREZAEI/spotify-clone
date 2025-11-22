import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';
import SongOptions from './SongOptions';

const SongRowContainer = styled.article`
  margin: 8px;
  padding: 12px;
  width: auto;
  flex: 1 1 180px;
  max-width: 180px;
  background-color: rgba(255,255,255,0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 8px;
  cursor: pointer;
  transition: transform .22s ease, box-shadow .22s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
  &:hover .play-button { opacity: 1; transform: translateY(0); }

  img { 
    width: 100%; 
    height: auto; 
    border-radius: 6px; 
    margin-bottom: 10px; 
    object-fit: cover; 
  }

  .song-info {
    flex: 1;
    min-width: 0;
    
    h4 { 
      font-size: 14px; 
      margin: 0; 
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
    }
    p { 
      font-size: 12px; 
      color: #b3b3b3; 
      margin: 4px 0 0 0; 
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
    }
  }

  .play-button {
    position: absolute;
    bottom: 84px;
    right: 14px;
    width: 48px;
    height: 48px;
    background-color: #1db954;
    border-radius: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    opacity: 0;
    transform: translateY(10px);
    transition: all .26s ease;
  }

  /* موبایل - حالت افقی */
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    gap: 12px;
    padding: 10px;
    align-items: center;
    max-width: none;
    margin: 6px 0;

    img { 
      width: 84px; 
      height: 84px; 
      margin-bottom: 0; 
      border-radius: 6px; 
      flex-shrink: 0; 
    }
    
    .song-info { 
      flex: 1;
      min-width: 0;
      
      h4 { 
        font-size: 14px; 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      } 
      
      p { 
        display: block; 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      } 
    }
    
    .play-button { 
      position: relative;
      bottom: auto; 
      right: auto;
      width: 40px; 
      height: 40px; 
      opacity: 1; 
      transform: none; 
      margin-left: auto; 
      flex-shrink: 0;
    }
  }

  @media (max-width: 480px) {
    gap: 10px;
    padding: 8px;
    
    img { 
      width: 72px; 
      height: 72px; 
    }
    
    .song-info h4 { 
      font-size: 13px; 
    }
    
    .song-info p { 
      font-size: 11px; 
    }
    
    .play-button { 
      width: 36px; 
      height: 36px; 
    }
  }

  @media (max-width: 360px) {
    gap: 8px;
    padding: 6px;
    
    img { 
      width: 64px; 
      height: 64px; 
    }
    
    .song-info h4 { 
      font-size: 12px; 
    }
  }
`;

const LikeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 22px;
  cursor: pointer;
  background: transparent;
  border: none;
  opacity: 0.85;
  transition: transform .12s ease;
  z-index: 2;
  
  &:hover { transform: scale(1.08); }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    order: 3;
    margin-left: 8px;
  }
`;

const OptionsButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  padding: 4px;
  border-radius: 50%;
  transition: background .12s ease;
  z-index: 2;
  
  &:hover { background: rgba(255,255,255,0.03); opacity: 1; }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    order: 1;
  }
`;

const MobileControls = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    order: 2;
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

  const handleGoToArtist = (e) => {
    e.stopPropagation();
    alert(`Going to artist: ${track.artist}`);
    setShowOptions(false);
  };

  const handleGoToAlbum = (e) => {
    e.stopPropagation();
    alert(`Going to album: ${track.album}`);
    setShowOptions(false);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: track.name,
        text: `Check out ${track.name} by ${track.artist}`,
        url: window.location.href
      });
    } else {
      alert(`Share link for ${track.name}`);
    }
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    if (showOptions) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  return (
    <SongRowContainer onClick={handlePlaySong} role="article" aria-label={`track ${track.name}`}>
      {/* دسکتاپ */}
      <div ref={optionsRef} style={{ position: 'relative' }}>
        <OptionsButton onClick={(e) => { e.stopPropagation(); setShowOptions(!showOptions); }}>
          <FiMoreVertical />
        </OptionsButton>
        {showOptions && (
          <SongOptions 
            onAddToPlaylist={handleAddToPlaylist}
            onGoToArtist={handleGoToArtist}
            onGoToAlbum={handleGoToAlbum}
            onShare={handleShare}
          />
        )}
      </div>

      <LikeButton onClick={handleLike} aria-pressed={isLiked}>
        {isLiked ? '❤️' : '🤍'}
      </LikeButton>

      <img src={track.albumArt} alt={track.name} />
      <div className="song-info">
        <h4 title={track.name}>{track.name}</h4>
        <p title={track.artist}>{track.artist}</p>
      </div>

      <div className="play-button" aria-hidden>
        <span style={{ fontSize: 18 }}>▶</span>
      </div>

      {/* موبایل */}
      <MobileControls>
        <OptionsButton onClick={(e) => { e.stopPropagation(); setShowOptions(!showOptions); }}>
          <FiMoreVertical />
        </OptionsButton>
        <LikeButton onClick={handleLike} aria-pressed={isLiked}>
          {isLiked ? '❤️' : '🤍'}
        </LikeButton>
      </MobileControls>
    </SongRowContainer>
  );
}

export default SongRow;