// src/pages/PlaylistPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import SongRow from '../components/SongRow';
import { useDataLayerValue } from '../context/DataLayer';

const PlaylistPageContainer = styled.div`
  flex-grow: 1;
  background: linear-gradient(to bottom, #4a4e69, #22223b);
  padding: 32px;
  overflow-y: auto;
`;

const PlaylistHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 32px;

  img {
    width: 232px;
    height: 232px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    border-radius: 8px;
  }

  div {
    color: white;
    h1 {
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
      margin: 0;
    }
    h2 {
      font-size: 72px;
      font-weight: 900;
      margin: 8px 0;
    }
    p {
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      color: #b3b3b3;
    }
  }
`;

const PlaylistSongsContainer = styled.div`
  background-color: rgba(24,24,24,0.6);
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
  border-radius: 8px 8px 0 0;
`;

const EmptyPlaylistMessage = styled.p`
  color: #b3b3b3;
  padding: 40px;
  text-align: center;
  font-size: 18px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #b3b3b3;
  text-decoration: none;
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 16px;
  &:hover { color: #fff; }
`;

function PlaylistPage() {
  // 1. آیدی پلی‌لیست را از URL می‌گیریم
  const { id } = useParams();
  // 2. لیست تمام پلی‌لیست‌ها را از DataLayer می‌گیریم
  const [{ playlists }] = useDataLayerValue();

  // 3. پلی‌لیست مورد نظر را بر اساس آیدی پیدا می‌کنیم
  const playlist = playlists.find(p => p.id === parseInt(id));

  if (!playlist) {
    return <div style={{ color: 'white', padding: '20px' }}>پلی‌لیست پیدا نشد!</div>;
  }

  // برای اطمینان، اگر آرایه آهنگ‌ها وجود نداشت، یک آرایه خالی در نظر می‌گیریم
  const songsToRender = playlist.songs || [];

  return (
    <PlaylistPageContainer>
      <BackButton to="/library">← بازگشت به کتابخانه</BackButton>
      
      <PlaylistHeader>
        <img src={playlist.image} alt={playlist.name} />
        <div>
          <h1>Playlist</h1>
          <h2>{playlist.name}</h2>
          <p>{songsToRender.length} آهنگ</p>
        </div>
      </PlaylistHeader>

      <PlaylistSongsContainer>
        {/* 4. اگر آهنگی وجود داشت، آن‌ها را نمایش بده، در غیر این صورت پیام خالی بودن را نشان بده */}
        {songsToRender.length > 0 ? (
          songsToRender.map(song => (
            <SongRow key={song.id} track={song} />
          ))
        ) : (
          <EmptyPlaylistMessage>
            این پلی‌لیست خالی است. از صفحه‌ی اصلی آهنگ‌هایی به آن اضافه کنید.
          </EmptyPlaylistMessage>
        )}
      </PlaylistSongsContainer>
    </PlaylistPageContainer>
  );
}

export default PlaylistPage;