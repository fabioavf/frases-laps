import { styled } from 'solid-styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

interface IFlexProps {
  alignItems?: string;
  justifyContent?: string;
  gap?: number;
}

export const Col = styled.div<IFlexProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'unset')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'unset')};
  gap: ${(props) => (props.gap ? props.gap + 'rem' : 'unset')};
`;

export const Card = styled.form`
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

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
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
  text-align: center;

  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(97, 23, 194, 0.1);

  cursor: pointer;
`;
