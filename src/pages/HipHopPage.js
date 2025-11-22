// src/pages/HipHopPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';

// می‌توانید داده‌های مخصوص هیپ‌هاپ را اینجا قرار دهید
const hipHopSongsData = [
  { id: 1, name: 'Hip-Hop Song 1', artist: 'Artist A', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1887', audioUrl: '/audio/OVERTHINK%209_2.mp3' },
  { id: 2, name: 'Hip-Hop Song 2', artist: 'Artist B', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1887', audioUrl: '/audio/Hiphopologist - Darya .mp3' },
];

const HipHopContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #4a69bd, #121212); /* رنگ آبی برای تم هیپ‌هاپ */
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function HipHopPage() {
  return (
    <HipHopContainer>
      <Section title="Hip-Hop Essentials" items={hipHopSongsData} />
    </HipHopContainer>
  );
}

export default HipHopPage;