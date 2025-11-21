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
  /* ارتفاع کل صفحه منهای پلیر */
  height: calc(100vh - 90px);
`;

// کانتینری که محتوا و فوتر را در بر می‌گیرد و اسکرول می‌شود
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* این بخش اسکرول می‌خورد */
`;

// یک کانتینر برای صفحات که فضا را پر کند
const PageWrapper = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Sidebar />
          <MainContent>
            {/* نوار بالایی به اینجا منتقل شد */}
            <TopNavbar />
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