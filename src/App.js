import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs';
import Player from './components/Player';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import SelectPlaylistModal from './components/SelectPlaylistModal';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  /* این خط بسیار مهم است */
  margin-top: 56px; /* فضا برای نوار ثابت بالایی */
  height: calc(100vh - 56px); /* ارتفاع کل صفحه منهای نوار */
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const PageWrapper = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <TopNavbar /> {/* نوار ثابت در بیرون از کانتینر اصلی */}
        <AppContainer>
          <Sidebar />
          <MainContent>
            <PageWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
              </Routes>
            </PageWrapper>
            <Footer />
          </MainContent>
        </AppContainer>
        <Player />
      </Router>
      <CreatePlaylistModal />
      <SelectPlaylistModal />
    </>
  );
}

export default App;