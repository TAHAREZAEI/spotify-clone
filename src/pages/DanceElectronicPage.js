// src/pages/DanceElectronicPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';

const danceSongsData = [
  { id: 1, name: 'Dance Track 1', artist: 'DJ X', albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1887', audioUrl: '/audio/OVERTHINK%209_2.mp3' },
  { id: 2, name: 'Electronic Beat', artist: 'Synthwave', albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1887', audioUrl: '/audio/Hiphopologist - Darya .mp3' },
];

const DanceContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #9b59b6, #121212); /* رنگ بنفش برای تم رقص */
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function DanceElectronicPage() {
  return (
    <DanceContainer>
      <Section title="Dance/Electronic Hits" items={danceSongsData} />
    </DanceContainer>
  );
}

export default DanceElectronicPage;