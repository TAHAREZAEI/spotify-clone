import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiSearch } from 'react-icons/fi';
import LibraryItem from '../components/LibraryItem';

// داده‌های ساختگی برای بخش‌های مختلف
const playlistsData = [
  { id: 1, name: 'My Playlist #1', type: 'Playlist', image: 'https://i.scdn.co/image/ab67616d0000b2734d1b7055b1c71f9d2a761437' },
  { id: 2, name: 'Chill Vibes', type: 'Playlist', image: 'https://i.scdn.co/image/ab67616d0000b2734716a0e0a1e0d1f3e8e6b4f6' },
  { id: 3, name: 'Workout Mix', type: 'Playlist', image: 'https://i.scdn.co/image/ab67616d0000b2736a9b8e8e0a1e0d1f3e8e6b4f6' },
];

const podcastsData = [
  { id: 4, name: 'The Joe Rogan Experience', type: 'Podcast', image: 'https://i.scdn.co/image/ab67616d0000b2737a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 5, name: 'Call Her Daddy', type: 'Podcast', image: 'https://i.scdn.co/image/ab67616d0000b2738a9b8e8e0a1e0d1f3e8e6b4f6' },
];

const artistsData = [
  { id: 6, name: 'Taylor Swift', type: 'Artist', image: 'https://i.scdn.co/image/ab67616d0000b2732a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 7, name: 'The Weeknd', type: 'Artist', image: 'https://i.scdn.co/image/ab67616d0000b2733a9b8e8e0a1e0d1f3e8e6b4f6' },
];

const LibraryContainer = styled.div`
  flex-grow: 1;
  background-color: #121212;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

const LibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const TabList = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #282828;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'white' : '#b3b3b3'};
  font-size: 16px;
  font-weight: 700;
  padding: 12px 0;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #1db954;
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.2s;
  }
`;

const ContentArea = styled.div`
  margin-top: 16px;
`;

function Library() {
  const [activeTab, setActiveTab] = useState('Playlists');

  const renderContent = () => {
    switch (activeTab) {
      case 'Playlists':
        return playlistsData.map(item => <LibraryItem key={item.id} {...item} />);
      case 'Podcasts':
        return podcastsData.map(item => <LibraryItem key={item.id} {...item} />);
      case 'Artists':
        return artistsData.map(item => <LibraryItem key={item.id} {...item} />);
      default:
        return null;
    }
  };

  return (
    <LibraryContainer>
      <LibraryHeader>
        <div>
          <h1 style={{ color: 'white', fontSize: '24px' }}>Your Library</h1>
        </div>
        <HeaderButtons>
          <HeaderButton>
            <FiSearch size={20} />
          </HeaderButton>
          <HeaderButton>
            <FiPlus size={20} />
          </HeaderButton>
        </HeaderButtons>
      </LibraryHeader>

      <TabList>
        <TabButton active={activeTab === 'Playlists'} onClick={() => setActiveTab('Playlists')}>
          Playlists
        </TabButton>
        <TabButton active={activeTab === 'Podcasts'} onClick={() => setActiveTab('Podcasts')}>
          Podcasts
        </TabButton>
        <TabButton active={activeTab === 'Artists'} onClick={() => setActiveTab('Artists')}>
          Artists
        </TabButton>
      </TabList>

      <ContentArea>
        {renderContent()}
      </ContentArea>
    </LibraryContainer>
  );
}

export default Library;