// src/pages/PopPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';

// داده‌های آهنگ‌های پاپ (کپی شده از صفحه‌ی Home)
import imagesJpg from '../assets/images.jpg';
import downloadJpg from '../assets/download.jpg';
import a from '../assets/a.jpg';
import aa from '../assets/aa.jpg';
import qq from '../assets/qq.jpg';

const popSongsData = [
  { id: 1, name: 'My Custom Playlist 1', artist: 'Artist Name', albumArt: imagesJpg, audioUrl: '/audio/OVERTHINK%209_2.mp3' },
  { id: 2, name: 'My Custom Playlist 2', artist: 'Another Artist', albumArt: downloadJpg, audioUrl: '/audio/Hiphopologist - Darya .mp3' },
  { id: 3, name: 'My Custom Playlist 3', artist: 'Another Artist', albumArt: a, audioUrl: '/audio/Hiphopologist - Ghors 2 (320).mp3'},
  { id: 4, name: 'My Custom Playlist 4', artist: 'Another Artist', albumArt: aa, audioUrl: '/audio/Hiphopologist - Ghors (320).mp3'},
  { id: 5, name: 'My Custom Playlist 5', artist: 'Another Artist', albumArt: qq, audioUrl: '/audio/Hiphopologist - Ex.mp3'},
];

// یک ظرف برای صفحه‌ی پاپ با یک گرادینت رنگی متفاوت
const PopContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #e91e63 0%, #121212 100%); /* رنگ صورتی برای تم پاپ */
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function PopPage() {
  return (
    <PopContainer>
      {/* از کامپوننت Section برای نمایش کارت‌ها استفاده می‌کنیم */}
      <Section title="Pop Hits" items={popSongsData} />
    </PopContainer>
  );
}

export default PopPage;