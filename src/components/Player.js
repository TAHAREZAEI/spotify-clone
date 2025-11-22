import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const PlayerContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 74px;
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
  z-index: 999;

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

  /* موبایل: ساده و کم‌جا */
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

  /* بسیار کوچک: اطلاعات کنار گذاشته شود */
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

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

function Player() {
  const [{ item, playing, audioSrc, currentTime, duration, playerCollapsed }, dispatch] = useDataLayerValue();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(err => console.error(err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = audioSrc || '';
      audio.load();
    }
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const setAudioData = () => {
      dispatch({ type: 'SET_DURATION', duration: audio.duration || 0 });
      dispatch({ type: 'SET_CURRENT_TIME', currentTime: audio.currentTime || 0 });
    };
    const setAudioTime = () => dispatch({ type: 'SET_CURRENT_TIME', currentTime: audio.currentTime || 0 });
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioSrc, dispatch]);

  const handlePlayPause = () => dispatch({ type: 'SET_PLAYING', playing: !playing });

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    if (audio) audio.currentTime = seekTime;
    dispatch({ type: 'SET_CURRENT_TIME', currentTime: seekTime });
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <PlayerContainer collapsed={playerCollapsed} role="region" aria-label="player">
      <audio ref={audioRef} src={audioSrc || ''} />
      <CollapseButton
        aria-pressed={!!playerCollapsed}
        aria-label={playerCollapsed ? 'باز کردن پلیر' : 'بستن پلیر'}
        onClick={() => dispatch({ type: 'TOGGLE_PLAYER_COLLAPSE' })}
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
        <div className="player-controls" role="group" aria-label="player controls">
          <FiSkipBack size={18} />
          <div className="play-pause-button" onClick={handlePlayPause} role="button" aria-label="play pause">
            {playing ? <FiPause size={16} /> : <FiPlay size={16} />}
          </div>
          <FiSkipForward size={18} />
        </div>

        <PlayerProgress>
          <span>{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            handleSeek({ target: { value: percent }});
          }}>
            <div className="progress" style={{ width: `${progressPercentage}%` }} />
          </div>
          <span>{formatTime(duration)}</span>
        </PlayerProgress>
      </div>

      <div className="player-right">
        <span style={{ color: '#b3b3b3' }}>🔊</span>
      </div>
    </PlayerContainer>
  );
}

export default Player;
