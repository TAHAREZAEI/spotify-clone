import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSkipBack, FiSkipForward, FiPlay, FiPause, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* ارتفاع کوچک‌تر */
  height: 70px;
  background-color: #181818;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #282828;
  /* افکت شیشه‌ای */
  background-color: rgba(24, 24, 24, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  /* انیمیشن برای جمع شدن */
  transform: translateY(${props => props.collapsed ? '100%' : '0'});
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  
  .player-left, .player-right { 
    flex: 0.3; 
  }
  
  .player-center { 
    flex: 0.4; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    gap: 4px; /* فاصله کمتر */
  }

  .player-controls { 
    display: flex; 
    align-items: center; 
    gap: 16px; 
    color: #b3b3b3; 
  }
  
  .player-controls .play-pause-button { 
    background-color: white; 
    color: black; 
    width: 32px; /* کمی کوچک‌تر */
    height: 32px; /* کمی کوچک‌تر */
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    cursor: pointer; 
  }

  .player-left .song-info { 
    display: flex; 
    align-items: center; 
  }
  
  .player-left .song-info img { 
    height: 50px; /* کمی کوچک‌تر */
    width: 50px; /* کمی کوچک‌تر */
    margin-right: 12px; 
  }
  
  .player-left .song-info .info-text h4 { 
    font-size: 13px; /* کمی کوچک‌تر */
    margin: 0; 
  }
  
  .player-left .song-info .info-text p { 
    font-size: 11px; /* کمی کوچک‌تر */
    color: #b3b3b3; 
    margin: 0; 
  }
`;

const PlayerProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 600px;

  span { 
    color: #b3b3b3; 
    font-size: 11px; /* کمی کوچک‌تر */
    min-width: 40px; 
  }
  
  .progress-bar {
    flex-grow: 1; 
    height: 3px; /* نازک‌تر */
    background-color: #535353; 
    border-radius: 2px; 
    position: relative; 
    cursor: pointer;
    
    .progress { 
      position: absolute; 
      left: 0; 
      top: 0; 
      height: 100%; 
      background-color: #b3b3b3; 
      border-radius: 2px; 
      transition: width 0.1s linear; 
    }
  }
`;

// دکمه جمع و باز کردن پلیر
const CollapseButton = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #282828;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #b3b3b3;
  transition: all 0.2s ease;

  &:hover {
    background-color: #383838;
    color: white;
  }
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
        audioRef.current.play().catch(error => console.error("Playback failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = audioSrc;
      audio.load();
    }
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const setAudioData = () => {
      dispatch({ type: 'SET_DURATION', duration: audio.duration });
      dispatch({ type: 'SET_CURRENT_TIME', currentTime: audio.currentTime });
    };
    const setAudioTime = () => dispatch({ type: 'SET_CURRENT_TIME', currentTime: audio.currentTime });
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioSrc, dispatch]);

  const handlePlayPause = () => {
    dispatch({ type: 'SET_PLAYING', playing: !playing });
  };
  
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    dispatch({ type: 'SET_CURRENT_TIME', currentTime: seekTime });
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <PlayerContainer collapsed={playerCollapsed}>
      <audio ref={audioRef} src={audioSrc} />
      <CollapseButton onClick={() => dispatch({ type: 'TOGGLE_PLAYER_COLLAPSE' })}>
        {playerCollapsed ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </CollapseButton>
      <div className="player-left">
        {item ? (
          <div className="song-info">
            <img src={item.albumArt} alt={item.name} />
            <div className="info-text">
              <h4>{item.name}</h4>
              <p>{item.artist}</p>
            </div>
          </div>
        ) : (
          <p>Select a song to play</p>
        )}
      </div>
      <div className="player-center">
        <div className="player-controls">
          <FiSkipBack size={18} />
          <div className="play-pause-button" onClick={handlePlayPause}>
            {playing ? <FiPause size={16} /> : <FiPlay size={16} style={{ marginLeft: '2px' }}/>}
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
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <span>{formatTime(duration)}</span>
        </PlayerProgress>
      </div>
      <div className="player-right"><span>🔊</span></div>
    </PlayerContainer>
  );
}

export default Player;