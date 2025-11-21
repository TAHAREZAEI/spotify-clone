import React, { createContext, useContext, useReducer } from 'react';

export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  likedSongs: [],
  // آدرس فایل صوتی آهنگ در حال پخش
  audioSrc: null,
  // مقادیر جدید برای نوار پیشرفت
  currentTime: 0,
  duration: 0,
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
        return {
          ...state,
          likedSongs: state.likedSongs.filter(song => song.id !== action.song.id),
        };
      } else {
        return {
          ...state,
          likedSongs: [...state.likedSongs, action.song],
        };
      }
    // اکشن جدید برای تنظیم منبع صوتی
    case 'SET_AUDIO_SRC':
      return { ...state, audioSrc: action.audioSrc };
    // اکشن‌های جدید برای نوار پیشرفت
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.currentTime };
    case 'SET_DURATION':
      return { ...state, duration: action.duration };
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