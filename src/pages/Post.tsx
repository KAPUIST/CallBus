import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PostDetail from "../components/PostDetail";

const Post: React.FC = () => {
  const navigator = useNavigate();
  const handleBackArrow = () => {
    navigator("/community/list");
  };
  let { post_pk } = useParams();
  const [postDetail, setPostDetail] = useState<any>([]);
  const [init, setInit] = useState<number>(0);
  //console.log(post_pk, "pk");

  const axios_GetPost_Detail = async () => {
    await axios.get("../../../data/Post.json").then((el) => {
      //console.log(el.data.POSTS, "post");
      const data = el.data.POSTS.filter((el: any) => el.pk === Number(post_pk));
      ///console.log(data, "???");
      return setPostDetail(data), setInit(1);
    });
  };
  useEffect(() => {
    axios_GetPost_Detail();
  }, []);

  console.log(postDetail, "detail");
  return (
    <Container>
      <Nav>
        <img
          className="arrow"
          src={"../../../arrow-left.svg"}
          alt="back-arrow"
          onClick={() => handleBackArrow()}
        ></img>
        <div className="arrow-explain">글 목록으로</div>
      </Nav>
      <PostDetail postDetail={postDetail} init={init} />
    </Container>
  );
};
export default Post;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: solid grey 1px;
  border-radius: 10px;
  width: 360px;
  height: 830px;
`;
const Nav = styled.div`
  display: flex;
  flex-direction: row;
  .arrow {
    width: 18px;
    height: 18px;
    margin: 21px 11px 10px 21px;
    cursor: pointer;
  }
  .arrow-explain {
    margin-top: 21px;
    font-size: 14px;
    font-weight: 700;
    line-height: 15px;
    color: #b4b4b4;
  }
`;
