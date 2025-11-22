// src/pages/PodcastsPage.js

import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';

const podcastsData = [
  { id: 1, name: 'The Daily Podcast', artist: 'The Daily', albumArt: 'https://i.scdn.co/image/ab67616d0000b2737a9b8e8e0a1e0d1f3e8e6b4f6' },
  { id: 2, name: 'Tech Talks', artist: 'TechNews', albumArt: 'https://i.scdn.co/image/ab67616d0000b2738a9b8e8e0a1e0d1f3e8e6b4f6' },
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