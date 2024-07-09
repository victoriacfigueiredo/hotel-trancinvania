// src/GlobalStyles.tsx
import { Global } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Trancinfont';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Hotel_trancinvania-Regular-Regular.otf') format('opentype'),
             url('/fonts/Hotel_trancinvania-Regular-Regular.ttf') format('truetype');
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
      }
      
      body {
        font-family: 'Inter', sans-serif;
      }
    `}
  />
);

export default GlobalStyles;