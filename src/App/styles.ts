import { styled } from 'solid-styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  background: linear-gradient(155.2deg, rgba(97, 23, 194, 0.74) 0.68%, rgba(194, 24, 121, 0.8) 112.96%);
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 0.5ch;

  padding: 1rem 2rem;
  /* width: 100%; */

  background-color: rgba(200, 171, 238, 0.4);
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);

  font-size: 0.75rem;

  color: #31046b;

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5ch;
    text-decoration: none;
    color: unset;

    &:hover {
      & span {
        text-decoration: underline;
        color: red;
      }
    }
  }
`;
