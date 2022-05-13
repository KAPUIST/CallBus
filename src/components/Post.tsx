import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
interface PostProps {
  currentTab: number;
}
const Post: React.FC<PostProps> = ({ currentTab }) => {
  const [post, setPost] = useState<any>([]);

  const navigate = useNavigate();
  const localData: any = localStorage.getItem("Data");
  const data = JSON.parse(localData).sort((a: any, b: any) => {
    a = new Date(a.writtenAt);
    b = new Date(b.writtenAt);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const handleToDetail = (el: number) => {
    navigate(`/community/post/${el}`);
    for (let i = 0; i < data.length; i++) {
      if (data[i].pk === el) {
        data[i].viewCount = data[i].viewCount + 1;
        localStorage.setItem("Data", JSON.stringify(data));
      }
    }
    return;
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

  const axios_GetPost = async () => {
    if (!localStorage.getItem("Data")) {
      await axios.get("../../../data/Post.json").then((res) => {
        localStorage.setItem("Data", JSON.stringify(res.data.POSTS));
      });
    }
  };

  const textLengthOverCut = (txt: string, len: any, lastTxt: string) => {
    if (len === "" || len === null) {
      len = 20;
    }
    if (lastTxt === "" || lastTxt === null) {
      lastTxt = "...";
    }
    if (txt.length > len) {
      txt = txt.substring(0, len) + lastTxt;
    }
    return txt;
  };

  useEffect(() => {
    //console.log(data);
    if (currentTab === 0) {
      setPost(data);
    } else if (currentTab === 1) {
      const hotData = data.filter((el: any) => el.viewCount > 100);
      setPost(hotData);
    } else if (currentTab === 2) {
      const petitionData = data.filter(
        (el: any) => el.categoryName === "대선청원"
      );
      setPost(petitionData);
    } else if (currentTab === 3) {
      const freeData = data.filter((el: any) => el.categoryName === "자유글");
      setPost(freeData);
    } else if (currentTab === 4) {
      const qnaData = data.filter((el: any) => el.categoryName === "질문/답변");
      setPost(qnaData);
    } else if (currentTab === 5) {
      const newsData = data.filter((el: any) => el.categoryName === "뉴스");
      setPost(newsData);
    } else if (currentTab === 6) {
      const tipData = data.filter((el: any) => el.categoryName === "노하우");
      setPost(tipData);
    }
  }, [currentTab]);
  //console.log(currentTab);
  //console.log(post.);
  axios_GetPost();
  return (
    <Container>
      {post.map((el: any, key: number) => {
        return (
          <PostData key={key}>
            <Header>
              <img src={el.writerProfileUrl} alt={el.writerNickName} />
              <div>
                <div className="user_name">{el.writerNickName}</div>
                <div className="category">
                  {el.categoryName} • {timeForToday(el.writtenAt)}
                </div>
              </div>
            </Header>
            <Main>
              <div className="title" onClick={() => handleToDetail(el.pk)}>
                {textLengthOverCut(el.title, 25, "...")}
              </div>
              <div className="content" onClick={() => handleToDetail(el.pk)}>
                {textLengthOverCut(el.content, 60, "...")}
              </div>
              {!el.imageUrl ? (
                <></>
              ) : (
                <img
                  className="content_image"
                  src={el.imageUrl}
                  onClick={() => handleToDetail(el.pk)}
                  alt="content_image"
                ></img>
              )}
              <PostInfo>
                <span className="post_view">
                  <img src="../../../eye.svg" alt="content_view"></img>
                  <span>{el.viewCount}</span>
                </span>
                <span className="post_likes">
                  <img src="../../../hand-thumbs-up.svg" alt="thumbs-up"></img>
                  <span>{el.likeCount}</span>
                </span>
                <span className="post_comment">
                  <img src="../../../chat-dots.svg" alt="chat"></img>
                  <span>{el.commentCount}</span>
                </span>
              </PostInfo>
            </Main>
            <Underbar />
          </PostData>
        );
      })}
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
  padding: 14px 14px 14px 16px;
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
const Underbar = styled.div`
  width: 360px;
  margin: 0;
  padding: 0;
  height: 6px;
  background-color: #e8e8e8;
`;
const PostInfo = styled.div`
  > span {
    color: #b4b4b4;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
    > img {
      width: 14px;
      height: 10px;
      color: #b4b4b4;
    }
  }
`;
