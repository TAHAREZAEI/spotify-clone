// src/pages/Library.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // <-- 1. Link را وارد کنید
import LibraryItem from '../components/LibraryItem';
import { useDataLayerValue } from '../context/DataLayer';

// ===== شروع تغییرات: وارد کردن (import) عکس‌های خودتان از پوشه assets =====
import aaImg from '../assets/aa.jpg';
import qqImg from '../assets/qq.jpg';
import ssImg from '../assets/ss.jpg';
import saImg from '../assets/sa.jpg';
// ===== پایان تغییرات =====

// داده‌های ساختگی podcasts و artists را با عکس‌های وارد شده آپدیت کنید
const podcastsData = [
  { id: 4, name: 'The Joe Rogan Experience', type: 'Podcast', image: aaImg },
  { id: 5, name: 'Call Her Daddy', type: 'Podcast', image: qqImg },
];

const artistsData = [
  { id: 6, name: 'Taylor Swift', type: 'Artist', image: ssImg },
  { id: 7, name: 'The Weeknd', type: 'Artist', image: saImg },
];

// بقیه‌ی کد شما بدون تغییر باقی می‌ماند
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
  const [{ playlists }, dispatch] = useDataLayerValue();
  const [activeTab, setActiveTab] = useState('Playlists');

  const handleDeletePlaylist = (playlistId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this playlist?");
    if (isConfirmed) {
      dispatch({ type: 'DELETE_PLAYLIST', playlistId });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Playlists':
        return playlists.map(item => (
          // 2. آیتم پلی‌لیست را با Link بپیچید
          <Link to={`/playlist/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
            <LibraryItem 
              {...item} 
              onDelete={(e) => {
                e.stopPropagation(); // جلوگیری از رفتن به صفحه پلی‌لیست هنگام کلیک روی حذف
                handleDeletePlaylist(item.id);
              }} 
            />
          </Link>
        ));
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