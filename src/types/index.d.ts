import React from 'react';

declare module 'react-slick';
declare module 'slick-carousel/slick/slick.css';
declare module 'slick-carousel/slick/slick-theme.css';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 