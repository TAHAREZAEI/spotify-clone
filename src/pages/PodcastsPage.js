// src/pages/PodcastsPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import a from '../assets/a.jpg';
import sa from "../assets/sa.jpg";
const podcastsData = [
  { id: 1, name: 'The Daily Podcast', artist: 'The Daily', albumArt: a,audioUrl: '/audio/Hiphopologist - Darya .mp3' },
  { id: 2, name: 'Tech Talks', artist: 'TechNews', albumArt: sa,  audioUrl: '/audio/Hiphopologist - Ex.mp3' },
];

const PodcastsContainer = styled.main`
  flex-grow: 1;
  background: linear-gradient(to bottom, #e67e22, #121212); /* رنگ نارنجی برای تم پادکست */
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

function PodcastsPage() {
  return (
    <PodcastsContainer>
      <Section title="Popular Podcasts" items={podcastsData} />
    </PodcastsContainer>
  );
}

export default PodcastsPage;