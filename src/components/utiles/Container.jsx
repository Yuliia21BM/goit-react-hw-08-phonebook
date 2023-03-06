import styled from 'styled-components';

const MainContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  /* outline: red 1px solid; */
  @media screen and (min-width: 480px) {
    width: 480px;
  }
  @media screen and (min-width: 768px) {
    width: 768px;
  }
  @media screen and (min-width: 1280px) {
    width: 1280px;
  }
`;

export const Container = ({ children }) => {
  return <MainContainer> {children}</MainContainer>;
};
