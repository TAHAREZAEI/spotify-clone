import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSkipBack, FiSkipForward, FiPlay, FiPause } from 'react-icons/fi';
import { useDataLayerValue } from '../context/DataLayer';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: #181818;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #282828;
  
  .player-left, .player-right { flex: 0.3; }
  .player-center { flex: 0.4; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .player-controls { display: flex; align-items: center; gap: 16px; color: #b3b3b3; }
  .player-controls .play-pause-button { background-color: white; color: black; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .player-left .song-info { display: flex; align-items: center; }
  .player-left .song-info img { height: 56px; width: 56px; margin-right: 12px; }
  .player-left .song-info .info-text h4 { font-size: 14px; margin: 0; }
  .player-left .song-info .info-text p { font-size: 12px; color: #b3b3b3; margin: 0; }
`;

// استایل‌های جدید برای نوار پیشرفت
const PlayerProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 600px;

  span {
    color: #b3b3b3;
    font-size: 12px;
    min-width: 40px;
  }

  .progress-bar {
    flex-grow: 1;
    height: 4px;
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

// تابع کمکی برای فرمت کردن زمان
const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

function Player() {
  const [{ item, playing, audioSrc, currentTime, duration }, dispatch] = useDataLayerValue();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      if (playing) {
        audioRef.current.play();
      }
    }
  }, [audioSrc]);

  // useEffect برای به‌روزرسانی زمان فعلی و مدت کل
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
    <PlayerContainer>
      <audio ref={audioRef} src={audioSrc} />
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
          <FiSkipBack size={20} />
          <div className="play-pause-button" onClick={handlePlayPause}>
            {playing ? <FiPause size={18} /> : <FiPlay size={18} style={{ marginLeft: '2px' }}/>}
          </div>
          <FiSkipForward size={20} />
        </div>
        {/* نوار پیشرفت جدید */}
        <PlayerProgress>
          <span>{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = ((e.clientX - rect.left) / rect.width) * 100;
              handleSeek({ target: { value: percent } });
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