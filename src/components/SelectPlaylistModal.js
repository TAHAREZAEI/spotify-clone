import React from 'react';
import styled from 'styled-components';
import { useDataLayerValue } from '../context/DataLayer';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #282828;
  padding: 24px;
  border-radius: 8px;
  width: 450px;
  max-height: 500px;
  overflow-y: auto;
`;

const ModalHeader = styled.h2`
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #383838;
  }

  img {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }
  
  p {
    color: white;
    font-weight: 600;
  }
`;

function SelectPlaylistModal() {
  const [{ selectPlaylistModalOpen, playlists, songToAdd }, dispatch] = useDataLayerValue();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SELECT_PLAYLIST_MODAL' });
  };

  const handleSelectPlaylist = (playlist) => {
    dispatch({
      type: 'ADD_SONG_TO_PLAYLIST',
      playlistId: playlist.id,
      song: songToAdd,
    });
    handleClose();
  };

  if (!selectPlaylistModalOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Add to Playlist</ModalHeader>
        {playlists.map((playlist) => (
          <PlaylistItem key={playlist.id} onClick={() => handleSelectPlaylist(playlist)}>
            <img src={playlist.image} alt={playlist.name} />
            <p>{playlist.name}</p>
          </PlaylistItem>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
}

export default SelectPlaylistModal;