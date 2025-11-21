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
import BottomNav from './components/BottomNav';
import MobileMenu from './components/MobileMenu';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// این خط بسیار مهم است
import { useDataLayerValue } from './context/DataLayer'; 

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
  // از useDataLayerValue برای گرفتن dispatch و mobileMenuOpen استفاده می‌کنیم
  const [{ mobileMenuOpen }, dispatch] = useDataLayerValue();

  return (
    <>
      <GlobalStyle />
      <Router>
        {/* نوار بالایی و پلیر همیشه در بیرون قرار دارند */}
        <TopNavbar />
        <Player />
        
        {/* ساختار اصلی برای دسکتاپ و تبلت */}
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
                </Routes>
              </PageWrapper>
              <Footer />
            </ScrollableArea>
          </MainContentWrapper>
        </AppContainer>
        
        {/* منوی موبایل و مودال‌ها فقط در موبایل نمایش داده می‌شوند */}
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
    </>
  );
}

export default App;