// src/pages/MoodPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import a from '../assets/a.jpg';
const moodSongsData = [
  { id: 1, name: 'Chill Vibes', artist: 'Relaxing Artist', albumArt: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1887', audioUrl: '/audio/OVERTHINK%209_2.mp3' },
  { id: 2, name: 'Focus Flow', artist: 'Study Beats', albumArt: a , audioUrl: '/audio/Hiphopologist - Darya .mp3' },
];

const MoodContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #27ae60, #121212); /* رنگ سبز برای تم حال و هوا */
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function MoodPage() {
  return (
    <MoodContainer>
      {/* اینجا خط اصلاح شده است */}
      <Section title="Mood Playlists" items={moodSongsData} />
    </MoodContainer>
  );
}

export default MoodPage;