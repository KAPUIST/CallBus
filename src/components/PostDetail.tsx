import React, { useEffect, useState } from "react";
import styled from "styled-components";
interface DetailProps {
  postDetail: [
    {
      categoryPk: number;
      categoryName: string;
      pk: number;
      title: string;
      content: string;
      viewCount: number;
      likeCount: number;
      commentCount: number;
      imageUrl: null | string;
      writtenAt: string;
      writerNickName: string;
      writerProfileUrl: string;
    }
  ];
  init: number;
}

const PostDetail: React.FC<DetailProps> = ({ postDetail, init }) => {
  const localData: any = localStorage.getItem("Data");
  const data = JSON.parse(localData);
  const [likeCount, setLikeCount] = useState(postDetail[0].likeCount);

  const handleCount = (pk: number) => {
    const loadLikeData: any = localStorage.getItem("LikeData");
    const likeData = JSON.parse(loadLikeData);

    if (!likeData) {
      localStorage.setItem("LikeData", JSON.stringify([pk]));
    } else if (likeData.includes(pk)) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].pk === pk) {
          //console.log(likeData, "1");
          const fixData = likeData.filter((el: number) => el !== pk);
          //console.log(fixData, "2");
          data[j].likeCount = data[j].likeCount - 1;
          setLikeCount(likeCount - 1);
          localStorage.setItem("Data", JSON.stringify(data));
          localStorage.setItem("LikeData", JSON.stringify(fixData));
        }
      }
    } else {
      console.log(1);
      for (let j = 0; j < data.length; j++) {
        if (data[j].pk === pk) {
          data[j].likeCount = data[j].likeCount + 1;
          setLikeCount(likeCount + 1);
          likeData.push(pk);
          localStorage.setItem("Data", JSON.stringify(data));
          localStorage.setItem("LikeData", JSON.stringify(likeData));
        }
      }
    }
  };
  const timeForToday = (value: string) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    } else {
      const overDate = value.split("T")[0];
      return overDate.slice(2, 10);
    }
  };

  return (
    <Container>
      {init ? (
        <PostData>
          <Header>
            <img
              src={postDetail[0].writerProfileUrl}
              alt={postDetail[0].writerNickName}
            />
            <div>
              <div className="user_name">{postDetail[0].writerNickName}</div>
              <div className="category">
                {postDetail[0].categoryName} •
                {timeForToday(postDetail[0].writtenAt)}
              </div>
            </div>
          </Header>
          <Main>
            <div className="title">{postDetail[0].title}</div>
            <div className="content">{postDetail[0].content}</div>
            {!postDetail[0].imageUrl ? (
              <></>
            ) : (
              <img
                className="content_image"
                src={postDetail[0].imageUrl}
                alt="content_image"
              ></img>
            )}
            <PostInfo>
              <span
                className="post_likes"
                onClick={() => handleCount(postDetail[0].pk)}
              >
                <img src="../../../hand-thumbs-up.svg" alt="thumns-up"></img>
                <span>{likeCount}</span>
              </span>
              <span className="post_comment">
                <img src="../../../chat-dots.svg" alt="chat"></img>
                <span>{postDetail[0].commentCount}</span>
              </span>
            </PostInfo>
          </Main>
        </PostData>
      ) : (
        ""
      )}
    </Container>
  );
};

export default PostDetail;
const Container = styled.div`
  display: flex;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  overflow: auto;
  flex-direction: column;
  border: 0 solid black;
  width: 100%;
`;
const PostData = styled.article`
  margin: 0;
`;

const Header = styled.header`
  display: flex;
  padding: 14px 14px 14px 16px;
  > img {
    width: 32px;
    height: 32px;
    display: block;
    border-radius: 50%;
  }

  .user_name {
    display: flex;
    height: 12px;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    color: #222222;
  }
  .category {
    color: #b4b4b4;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    padding: 14px 14px 14px 16px;
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    color: #222222;
    margin-bottom: 6px;
  }
  .content {
    padding: 14px 14px 14px 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    color: #7a7a7a;
  }
  .content_image {
    width: 358px;
    height: 356px;
    margin-bottom: 15px;
  }
`;
const PostInfo = styled.div`
  margin-bottom: 20px;

  > span {
    transition-duration: 0.4s;
    margin-left: 25px;
    padding: 9px 9px 9px 9px;
    background-color: #f8f8f8;
    border-radius: 6px;
    color: #b4b4b4;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
    cursor: pointer;
    :hover {
      background-color: #2c7fff; /* Green */
      color: white;
    }
    > img {
      margin-right: 5px;
      width: 14px;
      height: 10px;
    }
  }
`;
