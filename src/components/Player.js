import React from 'react';
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
  
  .player-left, .player-right {
    flex: 0.3;
  }
  
  .player-center {
    flex: 0.4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
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
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .player-left .song-info {
    display: flex;
    align-items: center;
    
    img {
      height: 56px;
      width: 56px;
      margin-right: 12px;
    }

    .info-text {
      h4 {
        font-size: 14px;
        margin: 0;
      }
      p {
        font-size: 12px;
        color: #b3b3b3;
        margin: 0;
      }
    }
  }
`;

// ...
function Player() {
  const [{ item, playing }, dispatch] = useDataLayerValue(); // اینجا نیازی به مقدار پیش‌فرض نیست چون مستقیما از آن استفاده نمی‌شود
// ...

  const handlePlayPause = () => {
    dispatch({
      type: 'SET_PLAYING',
      playing: !playing,
    });
  };

  return (
    <PlayerContainer>
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
      </div>

      <div className="player-right">
        <span>🔊</span>
      </div>
    </PlayerContainer>
  );
}

export default Player;