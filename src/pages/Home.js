import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';

// داده‌های ساختگی با تصاویر واقعی جایگزین شده‌اند
const madeForYouData = [
  { id: 1, name: 'Chill Lofi Study Beats', artist: 'Lofi Girl', albumArt: 'https://i.scdn.co/image/ab67616d0000b273475e8f5d1b1e0d1f3e8e6b4f6' },
  { id: 2, name: 'Discover Weekly', artist: 'Your weekly mixtape', albumArt: 'https://i.scdn.co/image/ab67616d0000b2734716a0e0a1e0d1f3e8e6b4f6' },
  { id: 3, name: 'Daily Mix 2', artist: 'Kendrick Lamar, J. Cole, Drake...', albumArt: 'https://i.scdn.co/image/ab67616d0000b2736a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 4, name: 'Rock Classics', artist: 'Queen, AC/DC, The Eagles...', albumArt: 'https://i.scdn.co/image/ab67616d0000b2738a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 5, name: 'Focus Flow', artist: 'Deep Focus, Study Music', albumArt: 'https://i.scdn.co/image/ab67616d0000b2739a9b8e8e0a1e0d1f3e8e6b4f6' },
];

const popularArtistsData = [
  { id: 6, name: 'Taylor Swift', artist: 'Artist', albumArt: 'https://i.scdn.co/image/ab67616d0000b2732a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 7, name: 'The Weeknd', artist: 'Artist', albumArt: 'https://i.scdn.co/image/ab67616d0000b2733a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 8, name: 'Bad Bunny', artist: 'Artist', albumArt: 'https://i.scdn.co/image/ab67616d0000b2730a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 9, name: 'Drake', artist: 'Artist', albumArt: 'https://i.scdn.co/image/ab67616d0000b2731a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 10, name: 'Billie Eilish', artist: 'Artist', albumArt: 'https://i.scdn.co/image/ab67616d0000b2734a9b8e8e0a1e0d1f3e8e6b4f6' },
];

const HomeContainer = styled.div`
  flex-grow: 1;
  background: linear-gradient(to bottom, #1e3264 0%, #121212 100%);
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function Home() {
  return (
    <HomeContainer>
      <Section title="Made For You" items={madeForYouData} />
      <Section title="Popular Artists" items={popularArtistsData} />
      {/* می‌توانید سکشن‌های بیشتری اضافه کنید */}
    </HomeContainer>
  );
}

export default Home;