import React, { createContext, useContext, useReducer } from 'react';

export const initialState = {
  user: null,
  playlists: [], // هر پلی‌لیست یک آرایه songs خواهد داشت
  playing: false,
  item: null,
  likedSongs: [],
  audioSrc: null,
  currentTime: 0,
  duration: 0,
  createPlaylistModalOpen: false,
  // مقادیر جدید برای مودال انتخاب پلی‌لیست
  selectPlaylistModalOpen: false,
  songToAdd: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'SET_PLAYING':
      return { ...state, playing: action.playing };
    case 'SET_ITEM':
      return { ...state, item: action.item };
    case 'SET_LIKED_SONGS':
      return { ...state, likedSongs: action.likedSongs };
    case 'TOGGLE_LIKE_SONG':
      const isLiked = state.likedSongs.some(song => song.id === action.song.id);
      if (isLiked) {
        return { ...state, likedSongs: state.likedSongs.filter(song => song.id !== action.song.id) };
      } else {
        return { ...state, likedSongs: [...state.likedSongs, action.song] };
      }
    case 'SET_AUDIO_SRC':
      return { ...state, audioSrc: action.audioSrc };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.currentTime };
    case 'SET_DURATION':
      return { ...state, duration: action.duration };
    case 'OPEN_CREATE_PLAYLIST_MODAL':
      return { ...state, createPlaylistModalOpen: true };
    case 'CLOSE_CREATE_PLAYLIST_MODAL':
      return { ...state, createPlaylistModalOpen: false };
    case 'CREATE_PLAYLIST':
      return { ...state, playlists: [...state.playlists, { ...action.playlist, songs: [] }] };
    // اکشن‌های جدید برای افزودن آهنگ به پلی‌لیست
    case 'OPEN_SELECT_PLAYLIST_MODAL':
      return { ...state, selectPlaylistModalOpen: true, songToAdd: action.song };
    case 'CLOSE_SELECT_PLAYLIST_MODAL':
      return { ...state, selectPlaylistModalOpen: false, songToAdd: null };
    case 'ADD_SONG_TO_PLAYLIST':
      const { playlistId, song } = action;
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === playlistId
            ? { ...playlist, songs: [...playlist.songs, song] }
            : playlist
        ),
      };
    // اکشن جدید برای حذف پلی‌لیست
    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter(playlist => playlist.id !== action.playlistId)
      };
    default:
      return state;
  }
};

export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

export const useDataLayerValue = () => useContext(DataLayerContext);