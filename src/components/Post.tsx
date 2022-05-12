import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
interface PostProps {
  currentTab: number;
}
const Post: React.FC<PostProps> = ({ currentTab }) => {
  const [post, setPost] = useState<any>([]);
  function timeForToday(value: string) {
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
  }

  const axios_GetPost = async () => {
    await axios.get("./data/Post.json").then((res) => {
      // const data = JSON.stringify(res.data.POSTS);
      if (currentTab === 0) {
        const data = res.data.POSTS;
        setPost(data);
      } else if (currentTab === 1) {
        const data = res.data.POSTS.filter((el: any) => el.viewCount > 100);
        setPost(data);
      } else if (currentTab === 2) {
        const data = res.data.POSTS.filter(
          (el: any) => el.categoryName === "대선청원"
        );
        setPost(data);
      } else if (currentTab === 3) {
        const data = res.data.POSTS.filter(
          (el: any) => el.categoryName === "자유글"
        );
        setPost(data);
      } else if (currentTab === 4) {
        const data = res.data.POSTS.filter(
          (el: any) => el.categoryName === "질문/답변"
        );
        setPost(data);
      } else if (currentTab === 5) {
        const data = res.data.POSTS.filter(
          (el: any) => el.categoryName === "뉴스"
        );
        setPost(data);
      } else if (currentTab === 6) {
        const data = res.data.POSTS.filter(
          (el: any) => el.categoryName === "노하우"
        );
        setPost(data);
      }
    });
  };
  function textLengthOverCut(txt: string, len: any, lastTxt: string) {
    if (len == "" || len == null) {
      // 기본값
      len = 20;
    }
    if (lastTxt == "" || lastTxt == null) {
      // 기본값
      lastTxt = "...";
    }
    if (txt.length > len) {
      txt = txt.substring(0, len) + lastTxt;
    }
    return txt;
  }
  useEffect(() => {
    axios_GetPost();
  }, [currentTab]);
  //console.log(currentTab);
  //console.log(post.);

  return (
    <Container>
      {post.map((el: any) => {
        return (
          <PostData>
            <Header>
              <img src={el.writerProfileUrl} alt={el.writerNickName} />
              <div>
                <div className="user_name">{el.writerNickName}</div>
                <div className="category">
                  {el.categoryName} / {timeForToday(el.writtenAt)}
                </div>
              </div>
            </Header>
            <Main>
              <div className="title">{el.title}</div>
              <div className="content">
                {textLengthOverCut(el.content, 60, "...")}
              </div>
              {!el.imageUrl ? (
                <></>
              ) : (
                <img className="content_image" src={el.imageUrl}></img>
              )}
            </Main>
          </PostData>
        );
      })}
      {/* <Header>
        <img src={`${post.writerProfileUrl}`} alt={post.writerNickName} />
      </Header>
      <PostData></PostData> */}
    </Container>
  );
};
export default Post;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0 solid black;
  width: 100%;
`;
const PostData = styled.article`
  margin: 0;
  padding: 14px 14px 14px 16px;
`;

const Header = styled.header`
  display: flex;

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
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    color: #222222;
    margin-bottom: 6px;
    cursor: pointer;
  }
  .content {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    color: #7a7a7a;
    cursor: pointer;
  }
  .content_image {
    height: 160px;
    cursor: pointer;
  }
`;
