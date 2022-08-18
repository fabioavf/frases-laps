import { styled } from 'solid-styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  background: linear-gradient(155.2deg, rgba(97, 23, 194, 0.74) 0.68%, rgba(194, 24, 121, 0.8) 112.96%);
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: min(100%, 320px);
  margin: 2rem;
  height: fit-content;

  padding: 1.5rem;
  border-radius: 8px;

  background-color: #dad8fd;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

  color: #6117c2;
  font-weight: 500;
  font-size: 1.5rem;

  transition: fit-content 500ms;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  padding: 0.75rem 1rem;

  background-color: #c8abee;

  color: #6117c2;
  font-weight: 600;

  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(97, 23, 194, 0.1);

  cursor: pointer;
`;

export const Loader = styled.div`
  border: 0.5rem solid transparent;
  border-top: 0.5rem solid #6117c2;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin: 2rem;
  animation: spin 2s ease-in-out infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
