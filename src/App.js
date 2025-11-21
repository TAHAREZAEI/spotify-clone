import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs';
import Player from './components/Player';
import CreatePlaylistModal from './components/CreatePlaylistModal'; // <-- Modal را import کنید
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
          </Routes>
        </AppContainer>
        <Player />
      </Router>
      {/* Modal را اینجا رندر کنید */}
      <CreatePlaylistModal />
    </>
  );
}

export default App;