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

// کامپوننت‌های اصلی
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import SelectPlaylistModal from './components/SelectPlaylistModal';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import MobileMenu from './components/MobileMenu';
import NowPlayingView from './components/NowPlayingView'; // <-- 1. کامپوننت جدید را وارد کنید
import { GlobalStyle } from './styles/GlobalStyle';

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
  const [{ mobileMenuOpen, nowPlayingViewOpen }, dispatch] = useDataLayerValue(); // <-- 2. nowPlayingViewOpen را از state بگیرید

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

      {/* 3. کامپوننت تمام‌صفحه را اینجا اضافه کنید */}
      {nowPlayingViewOpen && <NowPlayingView />}
    </>
  );
}

export default App;