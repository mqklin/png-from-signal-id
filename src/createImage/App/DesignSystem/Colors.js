import {css, createGlobalStyle} from 'styled-components';

export const [
  gray0,
  gray5,
  gray10,
  gray20,
  gray25,
  gray30,
  gray40,
  gray70,
  gray90,
  white,
  alert,
  primary,
  primaryHover,
  primaryLt,
  secondary,
  secondaryHover,
  secondaryLt,
  secondaryDk,
  alt,
  altHover,
  altLt,
] = [
  'var(--gray0)',
  'var(--gray5)',
  'var(--gray10)',
  'var(--gray20)',
  'var(--gray25)',
  'var(--gray30)',
  'var(--gray40)',
  'var(--gray70)',
  'var(--gray90)',
  'var(--white)',
  'var(--alert)',
  'var(--primary)',
  'var(--primaryHover)',
  'var(--primaryLt)',
  'var(--secondary)',
  'var(--secondaryHover)',
  'var(--secondaryLt)',
  'var(--secondaryDk)',
  'var(--alt)',
  'var(--altHover)',
  'var(--altLt)',
];

export const BUTTON_HOVER = css`
  &:hover {
    box-shadow: 0px 4px 4px rgba(170, 178, 197, 0.3);
  }
`;

const hashes = {
  gray0: '#DDDFE8',
  gray5: '#F7F8FA',
  gray10: '#AAB2C5',
  gray20: '#7A859E',
  gray25: '#E9EAF0',
  gray30: '#51566A',
  gray40: '#464A5C',
  gray70: '#1E2028',
  gray90: '#0B0C0F',
  white: '#fff',
  alert: '#FFF1A6',
  primary: '#0DB67A',
  primaryHover: '#0EC987',
  primaryLt: '#E4FDF4',
  secondary: '#FF393C',
  secondaryHover: '#FF4D50',
  secondaryLt: '#FFEBEC',
  secondaryDk: '#CD0003',
  alt: '#265CC6',
  altHover: '#2F67D7',
  altLt: '#EFF6FF',
};

export default createGlobalStyle`
  ${css`
    :root {
      ${Object.entries(hashes).map(([key, value]) => `--${key}: ${value};`).join(' ')}
    }
  `}
`;
