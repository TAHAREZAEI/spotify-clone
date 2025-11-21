import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs'; // مطمئن شو این خط وجود دارد
import Player from './components/Player';
import { GlobalStyle } from './styles/GlobalStyle';
// مطمئن شو این سه خط import شده باشند
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* کل اپلیکیشن باید داخل Router باشه */}
      <Router>
        <AppContainer>
          <Sidebar />
          {/* مسیرها باید داخل Routes تعریف بشن */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
          </Routes>
        </AppContainer>
        <Player />
      </Router>
    </>
  );
}

export default App;