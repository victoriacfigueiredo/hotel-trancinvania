// src/fonts.tsx
import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Trancinfont';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Hotel_trancinvania-Regular.otf') format('opentype'),
             url('/fonts/Hotel_trancinvania-Regular.ttf') format('truetype');
      }
    `}
  />
);
