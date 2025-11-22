// src/App.js

import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDataLayerValue } from './context/DataLayer';

// کامپوننت‌های صفحات
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs';
import PlaylistPage from './pages/PlaylistPage';
import PopPage from './pages/PopPage';
import HipHopPage from './pages/HipHopPage';
import DanceElectronicPage from './pages/DanceElectronicPage';
import PodcastsPage from './pages/PodcastsPage';
import MoodPage from './pages/MoodPage';
import RockPage from './pages/RockPage'; // <-- 1. صفحه‌ی جدید را وارد کنید

// کامپوننت‌های اصلی
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import SelectPlaylistModal from './components/SelectPlaylistModal';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import MobileMenu from './components/MobileMenu';
import NowPlayingView from './components/NowPlayingView';
import { GlobalStyle } from './styles/GlobalStyle';

// ... (کدهای styled-components شما بدون تغییر باقی می‌مانند)
const AppContainer = styled.div`
  /* در حالت عادی (دسکتاپ و تبلت): */
  display: flex;
  margin-top: 56px;
  height: calc(100vh - 56px);

  /* در صفحات بسیار کوچک (موبایل): */
  @media (max-width: 768px) {
    flex-direction: column;
    height: calc(100vh - 150px); /* ارتفاع کمتر به خاطر نوار پایین */
    margin-top: 0;
  }
`;

const MainContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollableArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 90px;
`;

const PageWrapper = styled.div`
  flex-grow: 1;
`;

function App() {
  const [{ mobileMenuOpen, nowPlayingViewOpen }, dispatch] = useDataLayerValue();

  return (
    <>
      <GlobalStyle />
      <Router>
        <TopNavbar />
        <Player />
        
        <AppContainer>
          <Sidebar />
          <MainContentWrapper>
            <ScrollableArea>
              <PageWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  {/* مسیرهای جدید برای هر دسته‌بندی */}
                  <Route path="/search/pop" element={<PopPage />} />
                  <Route path="/search/hip-hop" element={<HipHopPage />} />
                  <Route path="/search/dance-electronic" element={<DanceElectronicPage />} />
                  <Route path="/search/podcasts" element={<PodcastsPage />} />
                  <Route path="/search/mood" element={<MoodPage />} />
                  <Route path="/search/rock" element={<RockPage />} /> {/* <-- 2. مسیر جدید را اضافه کنید */}
                  <Route path="/library" element={<Library />} />
                  <Route path="/liked-songs" element={<LikedSongs />} />
                  <Route path="/playlist/:id" element={<PlaylistPage />} />
                </Routes>
              </PageWrapper>
              <Footer />
            </ScrollableArea>
          </MainContentWrapper>
        </AppContainer>
        
        <div css="@media (max-width: 768px) { display: block; }">
          <BottomNav />
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onClose={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })} 
          />
          <CreatePlaylistModal />
          <SelectPlaylistModal />
        </div>
      </Router>

      {nowPlayingViewOpen && <NowPlayingView />}
    </>
  );
}

export default App;