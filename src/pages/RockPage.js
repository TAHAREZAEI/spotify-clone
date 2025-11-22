// src/pages/RockPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import imagesJpg from '../assets/images.jpg';
import downloadJpg from '../assets/download.jpg';
import a from '../assets/a.jpg';
import aa from '../assets/aa.jpg';
import qq from '../assets/qq.jpg';
// می‌توانید داده‌های مخصوص موسیقی راک را اینجا قرار دهید
const rockSongsData = [
 { id: 1, name: 'My Custom Playlist 1', artist: 'Artist Name', albumArt: imagesJpg, audioUrl: '/audio/OVERTHINK%209_2.mp3' },
  { id: 2, name: 'My Custom Playlist 2', artist: 'Another Artist', albumArt: downloadJpg, audioUrl: '/audio/Hiphopologist - Darya .mp3' },
  { id: 3, name: 'My Custom Playlist 3', artist: 'Another Artist', albumArt: a, audioUrl: '/audio/Hiphopologist - Ghors 2 (320).mp3'},
  { id: 4, name: 'My Custom Playlist 4', artist: 'Another Artist', albumArt: aa, audioUrl: '/audio/Hiphopologist - Ghors (320).mp3'},
  { id: 5, name: 'My Custom Playlist 5', artist: 'Another Artist', albumArt: qq, audioUrl: '/audio/Hiphopologist - Ex.mp3'},
];

const RockContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #5d4037, #121212); /* رنگ قهوه‌ای تیره برای تم راک */
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function RockPage() {
  return (
    <RockContainer>
      <Section title="Rock Classics" items={rockSongsData} />
    </RockContainer>
  );
}

export default RockPage;