import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import Slider from '../components/Slider';

import imagesJpg from '../assets/images.jpg';
import downloadJpg from '../assets/download.jpg';
import a from '../assets/a.jpg';
import aa from '../assets/aa.jpg';
import qq from '../assets/qq.jpg';
import sa from '../assets/sa.jpg';
import ss from '../assets/ss.jpg';

import slider1 from '../assets/download.jpg';
import slider2 from '../assets/qq.jpg';
import slider3 from '../assets/a.jpg';

const madeForYouData = [
  { id: 1, name: 'My Custom Playlist 1', artist: 'Artist Name', albumArt: imagesJpg, audioUrl: '/audio/OVERTHINK%209_2.mp3' },
  { id: 2, name: 'My Custom Playlist 2', artist: 'Another Artist', albumArt: downloadJpg, audioUrl: '/audio/Hiphopologist - Darya .mp3' },
  { id: 3, name: 'My Custom Playlist 3', artist: 'Another Artist', albumArt: a, audioUrl: '/audio/Hiphopologist - Ghors 2 (320).mp3'},
  { id: 4, name: 'My Custom Playlist 4', artist: 'Another Artist', albumArt: aa, audioUrl: '/audio/Hiphopologist - Ghors (320).mp3'},
  { id: 5, name: 'My Custom Playlist 5', artist: 'Another Artist', albumArt: qq, audioUrl: '/audio/Hiphopologist - Ex.mp3'},
];

const popularArtistsData = [
  { id: 6, name: 'My Custom Playlist 6', artist: 'Another Artist', albumArt: sa, audioUrl: '/audio/Hiphopologist - Ghors 2 (320).mp3' },
  { id: 7, name: 'My Custom Playlist 7', artist: 'Another Artist', albumArt: ss, audioUrl: '/audio/Hiphopologist - Ex.mp3' },
  { id: 8, name: 'My Custom Playlist 8', artist: 'Another Artist', albumArt: a, audioUrl: '/audio/Hiphopologist - Ghors  (320).mp3'  },
  { id: 9, name: 'My Custom Playlist 9', artist: 'Another Artist', albumArt: downloadJpg, audioUrl: '/audio/Hiphopologist - Darya .mp3'},
  { id: 10, name: 'My Custom Playlist 10', artist: 'Another Artist', albumArt: ss, audioUrl: '/audio/Hiphopologist - Ex.mp3' },
];

const slidesData = [
  { id: 1, title: 'به موسیقی خود گوش دهید', subtitle: 'لیست‌های پخش شخصی و هنرمندان مورد علاقه شما.', image: slider1 },
  { id: 2, title: 'کشف کنید', subtitle: 'آهنگ‌های جدید و پادکست‌های محبوب.', image: slider2 },
  { id: 3, title: 'تمرکز کنید', subtitle: 'لیست‌های پخش برای کار و مطالعه.', image: slider3 },
];

const HomeContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #1e3264 0%, #121212 100%);
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);

  @media (max-width: 1024px) {
    padding: 18px;
    height: calc(100vh - 84px);
  }

  @media (max-width: 640px) {
    padding: 14px 12px;
    height: calc(100vh - 74px);
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Slider slides={slidesData} />
      <Section title="Made For You" items={madeForYouData} />
      <Section title="Popular Artists" items={popularArtistsData} />
    </HomeContainer>
  );
}

export default Home;