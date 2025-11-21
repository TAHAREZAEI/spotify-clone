import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';

// ۱. تصاویر خودتان را اینجا import کنید
import imagesJpg from '../assets/images.jpg';
import downloadJpg from '../assets/download.jpg';
import a from '../assets/a.jpg';
import aa from '../assets/aa.jpg';
import qq from '../assets/qq.jpg';
import sa from '../assets/sa.jpg';
import ss from '../assets/ss.jpg';

// ۲. داده‌های ساختگی

const madeForYouData = [
  { 
    id: 1, 
    name: 'My Custom Playlist 1', 
    artist: 'Artist Name', 
    albumArt: imagesJpg,
    // فقط این یک آهنگ آدرس صوتی دارد
    audioUrl: '/audio/OVERTHINK%209_2.mp3' 
  },
  { id: 2, name: 'My Custom Playlist 2', artist: 'Another Artist', albumArt: downloadJpg },
  { id: 3, name: 'My Custom Playlist 3', artist: 'Another Artist', albumArt: a},
  { id: 4, name: 'My Custom Playlist 4', artist: 'Another Artist', albumArt: aa },
  { id: 5, name: 'My Custom Playlist 5', artist: 'Another Artist', albumArt: qq },
];

const popularArtistsData = [
  // اینجا اشتباه تایپی داشتید (nname به name تغییر کرد)
  { id: 6, name: 'My Custom Playlist 6', artist: 'Another Artist', albumArt: sa },
  { id: 7, name: 'My Custom Playlist 7', artist: 'Another Artist', albumArt: ss },
  { id: 8, name: 'My Custom Playlist 8', artist: 'Another Artist', albumArt: a  },
  { id: 9, name: 'My Custom Playlist 9', artist: 'Another Artist', albumArt: downloadJpg },
  { id: 10, name: 'My Custom Playlist 10', artist: 'Another Artist', albumArt: ss },
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