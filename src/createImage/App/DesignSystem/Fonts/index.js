import {css, createGlobalStyle} from 'styled-components';


const fontSizeLineHeight = {
  h1m: [48, 56],
  h2m: [36, 48],
  h3m: [28, 36],
  h1a: [28, 38],
  h2a: [24, 32],
  h3a: [21, 30],
  bodyLg: [18, 26],
  bodyMd: [16, 24],
  bodySm: [14, 20],
  caption: [12, 16],
};

export const [
  h1m,
  h2m,
  h3m,
  h1a,
  h2a,
  h3a,
  bodyLg,
  bodyMd,
  bodySm,
  caption,
] = Object.entries(fontSizeLineHeight).map(([fontName, [_, lineHeight]]) => css`
  font-family: Poppins, sans-serif;
  font-size: var(--${fontName});
  line-height: ${lineHeight}px;
`);

export const [regular, semibold, bold] = ['regular', 'semibold', 'bold'].map(weight => css`
  font-weight: var(--${weight});
`);


export default createGlobalStyle`
  ${css`
    :root {
      ${Object.entries(fontSizeLineHeight).map(([fontName, [fontSize]]) => `--${fontName}: ${fontSize}px;`).join(' ')}
      --regular: 400;
      --semibold: 500;
      --bold: 600;
    }
    @font-face {
      font-family: 'Poppins';
      src: url(${require('./Poppins-Regular.ttf')}) format('truetype');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Poppins';
      src: url(${require('./Poppins-SemiBold.ttf')}) format('truetype');
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: 'Poppins';
      src: url(${require('./Poppins-Bold.ttf')}) format('truetype');
      font-weight: 600;
      font-style: normal;
    }
  `}
`;
