import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <img src="../icon-loading.gif" alt="loading" />
      <div>loading...</div>
    </LoadingContainer>
  );
};
export default Loading;
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  > img {
    width: 50px;
  }
  > div {
    font-size: small;
    font-family: "IBM Plex Sans KR", sans-serif;
  }
`;
