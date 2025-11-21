import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #121212;
    color: white;
  }

  /* مخفی کردن اسکرول بار برای ظاهر تمیزتر */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* در کروم/سافاری/اج */
  }
  html {
    -ms-overflow-style: none;  /* در IE و Edge */
    scrollbar-width: none;  /* در فایرفاکس */
  }
`;