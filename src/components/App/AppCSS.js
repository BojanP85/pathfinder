import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;

  @media(max-width: 426px) {
    width: 90%;
  }

  @media(max-width: 320px) {
    width: 100%;
  }

  h1 {
    margin: 0;

    @media(max-width: 600px) {
      font-size: 1.7rem;
    }
  }

  p {
    margin: 0;
    font-style: italic;
    color: #ff0000;
  }

  div {
    margin: auto;
    margin-top: 1rem;
    width: 50%;
    display: flex;
    justify-content: space-around;

    @media(max-width: 768px) {
      width: 100%;
    }

    @media(max-width: 600px) {
      flex-direction: column;
    }
  }
`;

export const Button = styled.button`
  width: 40%;
  background: #69a1cf;
  color: ${props => (props.disabled ? '' : '#e4eaf0')};
  font-size: 1rem;
  border: 1px solid #5b84a6;
  border-radius: 3px;
  padding: 0.3rem 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.26);
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  transition: background-color 0.3s ease;

  &:hover,
  &:active {
    color: ${props => (props.disabled ? '' : '#fff')};
    background: ${props => (props.disabled ? '' : '#5b84a6')};
  }

  @media(max-width: 600px) {
    width: 100%;

    &:first-child {
      margin-bottom: 0.6rem;
    }
  }

  span {
    animation: blinker 0.8s linear infinite;

    @keyframes blinker {
      50% {
        opacity: 0;
      }
    }
  }
`;

export const StyledTable = styled.table`
  margin: auto;
  margin-top: 2rem;
  width: 50%;
  border-collapse: collapse;

  @media(max-width: 768px) {
    width: 100%;
  }

  td {
    border: 1px solid #ddd;
    padding: 0.5rem;

    @media(max-width: 600px) {
      padding: 0;
    }
  }
`;
