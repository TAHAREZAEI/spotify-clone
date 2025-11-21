import React, { useState } from 'react';
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
  padding: 32px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

const ModalInput = styled.input`
  background-color: #3e3e3e;
  border: none;
  color: white;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #b3b3b3;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const ModalButton = styled.button`
  background-color: transparent;
  border: none;
  color: #b3b3b3;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const CreateButton = styled(ModalButton)`
  background-color: white;
  color: black;
  padding: 10px 32px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function CreatePlaylistModal() {
  const [{ createPlaylistModalOpen }, dispatch] = useDataLayerValue();
  const [playlistName, setPlaylistName] = useState('');

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CREATE_PLAYLIST_MODAL' });
    setPlaylistName('');
  };

  const handleCreate = () => {
    if (playlistName.trim()) {
      const newPlaylist = {
        id: new Date().getTime().toString(),
        name: playlistName,
        type: 'Playlist',
        image: 'https://picsum.photos/seed/playlist/300/300.jpg',
      };
      dispatch({ type: 'CREATE_PLAYLIST', playlist: newPlaylist });
      handleClose();
    }
  };

  if (!createPlaylistModalOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Create Playlist</ModalHeader>
        <ModalInput
          type="text"
          placeholder="Playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          autoFocus
        />
        <ModalButtons>
          <ModalButton onClick={handleClose}>CANCEL</ModalButton>
          <CreateButton onClick={handleCreate}>CREATE</CreateButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CreatePlaylistModal;