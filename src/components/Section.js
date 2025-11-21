import React from 'react';
import styled from 'styled-components';
import SongRow from './SongRow';

const SectionContainer = styled.div`
  margin-bottom: 40px;

  .section-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .section-items {
    display: flex;
    overflow-x: auto;
    padding-bottom: 10px;
    
    /* مخفی کردن اسکرول بار */
    scrollbar-width: none;
  }

  .section-items::-webkit-scrollbar {
    display: none;
  }
`;

function Section({ title, items }) {
  return (
    <SectionContainer>
      <h2 className="section-title">{title}</h2>
      <div className="section-items">
        {items.map((item) => (
          <SongRow key={item.id} track={item} />
        ))}
      </div>
    </SectionContainer>
  );
}

export default Section;