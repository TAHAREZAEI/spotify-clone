// src/components/Player.js

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiChevronDown, FiChevronUp, FiVolume2, FiVolumeX } from 'react-icons/fi'; // <-- 1. آیکون‌های صدا را وارد کنید
import { useDataLayerValue } from '../context/DataLayer';

// ... (کدهای styled-components شما بدون تغییر باقی می‌مانند)
const PlayerContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 74px;
  width: 100%;
  background-color: rgba(24,24,24,0.92);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  border-top: 1px solid rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transform: translateY(${props => props.collapsed ? '100%' : '0'});
  transition: transform 0.28s ease-in-out;
  z-index: 2000;
  cursor: pointer;

  .player-left, .player-right { 
    flex: 0 0 26%;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .player-center {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-width: 0;
    padding: 0 12px;
  }

  .player-controls {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #b3b3b3;
  }

  .play-pause-button {
    background-color: #ffffff;
    color: #000;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
  }

  .song-info img {
    width: 56px;
    height: 56px;
    border-radius: 6px;
    object-fit: cover;
  }

  .song-info .info-text h4 { font-size: 14px; margin: 0; color: #fff; }
  .song-info .info-text p { font-size: 12px; margin: 0; color: #b3b3b3; }

  @media (max-width: 640px) {
    height: 64px;
    padding: 6px 12px;
    .player-left { flex: 0 0 40%; }
    .player-right { flex: 0 0 20%; justify-content:flex-end; }
    .player-center { display:flex; flex-direction:column; gap:6px; padding: 0 8px; }
    .song-info img { width: 44px; height: 44px; }
    .play-pause-button { width: 32px; height: 32px; }
    .player-controls { gap: 10px; }
    .player-left .song-info .info-text h4 { font-size: 13px; }
    .player-left .song-info .info-text p { font-size: 11px; }
  }

  @media (max-width: 420px) {
    .player-left .song-info .info-text p { display: none; }
    .song-info .info-text h4 { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  }
`;

const PlayerProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 780px;

  span { color: #b3b3b3; font-size: 12px; min-width: 40px; }

  .progress-bar {
    flex-grow: 1;
    height: 4px;
    background-color: rgba(255,255,255,0.06);
    border-radius: 99px;
    position: relative;
    cursor: pointer;

    .progress {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: #1db954;
      border-radius: 99px;
      transition: width 0.12s linear;
    }
  }

  @media (max-width: 640px) {
    span { font-size: 11px; min-width: 36px; }
    .progress-bar { height: 3px; }
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #282828;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  color: #b3b3b3;
  transition: all .16s ease;
  z-index: 1000;

  &:hover { color: #fff; transform: translateX(-50%) scale(1.03); }
`;

// 2. یک styled-component برای دکمه‌ی صدا اضافه کنید
const VolumeButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;
  &:hover { color: #fff; }
`;

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

function Player() {
  // 3. state های isMuted و nowPlayingViewOpen را بگیرید
  const [{ item, playing, audioSrc, currentTime, duration, playerCollapsed, isMuted, nowPlayingViewOpen }, dispatch] = useDataLayerValue();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audioSrc) {
      audio.src = audioSrc;
      audio.load();

      const handleCanPlay = () => {
        if (playing) {
          audio.play().catch(err => console.error("Playback failed on canplay:", err));
        }
      };

      audio.addEventListener('canplay', handleCanPlay);

      if (playing) {
        audio.play().catch(err => console.error("Playback failed on play state change:", err));
      } else {
        audio.pause();
      }
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
      };
    } else {
      audio.pause();
      audio.src = '';
    }
  }, [audioSrc, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const setAudioData = () => {
      dispatch({ type: 'SET_DURATION', duration: audio.duration || 0 });
    };
    const setAudioTime = () => dispatch({ type: 'SET_CURRENT_TIME', currentTime: audio.currentTime || 0 });
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioSrc, dispatch]);

  // 4. useEffect جدید برای کنترل وضعیت muted در عنصر audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlayPause = () => dispatch({ type: 'SET_PLAYING', playing: !playing });

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    if (audio) audio.currentTime = seekTime;
    dispatch({ type: 'SET_CURRENT_TIME', currentTime: seekTime });
  };

  // 5. تابع جدید برای باز کردن نمای تمام‌صفحه
  const handleOpenNowPlaying = () => {
    dispatch({ type: 'TOGGLE_NOW_PLAYING_VIEW' });
  };

  // 6. تابع جدید برای تغییر وضعیت بی‌صدا
  const handleMuteToggle = () => {
    dispatch({ type: 'TOGGLE_MUTE' });
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <PlayerContainer 
      collapsed={playerCollapsed} 
      role="region" 
      aria-label="player"
      onClick={handleOpenNowPlaying}
    >
      <audio ref={audioRef} />
      <CollapseButton
        aria-pressed={!!playerCollapsed}
        aria-label={playerCollapsed ? 'باز کردن پلیر' : 'بستن پلیر'}
        onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'TOGGLE_PLAYER_COLLAPSE' });
        }}
      >
        {playerCollapsed ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </CollapseButton>

      <div className="player-left">
        {item ? (
          <div className="song-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={item.albumArt} alt={item.name} />
            <div className="info-text" style={{ minWidth: 0 }}>
              <h4 title={item.name}>{item.name}</h4>
              <p title={item.artist}>{item.artist}</p>
            </div>
          </div>
        ) : (
          <div style={{ color: '#b3b3b3' }}>Select a song to play</div>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls" role="group" aria-label="player controls" onClick={(e) => e.stopPropagation()}>
          <FiSkipBack size={18} />
          <div className="play-pause-button" onClick={handlePlayPause} role="button" aria-label="play pause">
            {playing ? <FiPause size={16} /> : <FiPlay size={16} />}
          </div>
          <FiSkipForward size={18} />
        </div>

        <PlayerProgress onClick={handleSeek}>
          <span>{formatTime(currentTime)}</span>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }} />
          </div>
          <span>{formatTime(duration)}</span>
        </PlayerProgress>
      </div>

      <div className="player-right">
        {/* 7. دکمه‌ی اسپیکر را با آیکون و رویداد مناسب جایگزین کنید */}
        <VolumeButton onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }} aria-label="mute/unmute">
          {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
        </VolumeButton>
      </div>
    </PlayerContainer>
  );
}

export default Player;