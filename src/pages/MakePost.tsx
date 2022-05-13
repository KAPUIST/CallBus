import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

const MakePost: React.FC = () => {
  const navigator = useNavigate();
  const [selectCategoriePk, setSelectCategoriePk] = useState<number>(0);
  const [selectCategorieName, setSelectCategorieNmae] = useState<string>("");
  const [pk, setPk] = useState<number>(0);
  const [titleContent, setTitleContent] = useState<string>("");
  const [textContent, setTextContent] = useState<any>("");
  const [photo, setPhoto] = useState<null | string>(null);
  const localData: any = localStorage.getItem("Data");
  const data = JSON.parse(localData);

  const findMaxPk = () => {
    const maxPk = data.map((el: any) => {
      return el.pk;
    });
    setPk(Math.max(...maxPk) + 1);
    console.log(pk);
  };
  useEffect(() => {
    findMaxPk();
  }, []);

  const getFullYmdStr = () => {
    var d = new Date();
    return d.toISOString();
  };

  const handleBackArrow = () => {
    navigator("/community/list");
  };
  const handleSelect = (e: any) => {
    // console.log(selectCategoriePk);
    //console.log(e.target.value);
    if (e.target.value === "대선청원") {
      setSelectCategorieNmae(e.target.value);
      setSelectCategoriePk(3);
    } else if (e.target.value === "자유글") {
      setSelectCategorieNmae(e.target.value);
      setSelectCategoriePk(4);
    } else if (e.target.value === "질문/답변") {
      setSelectCategorieNmae(e.target.value);
      setSelectCategoriePk(5);
    } else if (e.target.value === "뉴스") {
      setSelectCategorieNmae(e.target.value);
      setSelectCategoriePk(6);
    } else if (e.target.value === "노하우") {
      setSelectCategorieNmae(e.target.value);
      setSelectCategoriePk(7);
    }
  };
  const handleSubmit = () => {
    if (selectCategoriePk && titleContent && textContent) {
      const newPost = {
        categortPk: selectCategoriePk,
        categoryName: selectCategorieName,
        pk: pk,
        title: titleContent,
        content: textContent,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        imageUrl: photo,
        writtenAt: getFullYmdStr(),
        writerNickName: "손태권",
        writerProfileUrl:
          "https://static.zaritalk.com/profiles/profile-57-img-fox-39-39%403x.png",
      };
      data.push(newPost);
      //console.log(data, "123");
      window.localStorage.setItem("Data", JSON.stringify(data));
      navigator("/community/list");
    } else {
      swal("모든 내용을 작성해주세요");
    }
  };
  return (
    <Container>
      <Nav>
        <img
          className="arrow"
          src="../../arrow-left.svg"
          alt="back-arrow"
          onClick={() => handleBackArrow()}
        />
        <div className="make_post_tag">글쓰기</div>
        <button className="make_post_submit" onClick={handleSubmit}>
          완료
        </button>
      </Nav>
      <Selector>
        <select onChange={handleSelect}>
          <option value="미선택">미선택</option>
          <option value="대선청원">대선청원</option>
          <option value="자유글">자유글</option>
          <option value="질문/답변">질문/답변</option>
          <option value="뉴스">뉴스</option>
          <option value="노하우">노하우</option>
        </select>
      </Selector>
      <Title>
        <input
          onChange={(e) => setTitleContent(e.target.value)}
          className="title"
          placeholder="제목을 작성해주세요"
        ></input>
      </Title>
      <Content>
        <textarea
          onChange={(e) => setTextContent(e.target.value)}
          className="content"
          placeholder="내용을 작성해주세요.&#13;&#10;
          ◎ 사진 및 외부 콘텐츠 첨부시 영향력 상승!&#13;&#10;
          ◎ 뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여 넣으세요. 본문에 썸네일로 표시됩니다.&#13;&#10;
          ◎ 광고글 금지. 서비스 이용이 제한됩니다.
        "
        ></textarea>
      </Content>
    </Container>
  );
};

export default MakePost;
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
  justify-content: space-between;

  border-bottom: 1px solid #e8e8e8;
  .arrow {
    width: 18px;
    height: 18px;
    margin: 21px 11px 10px 21px;
    cursor: pointer;
  }
  .make_post_tag {
    margin-top: 18px;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: #222222;
  }
  .make_post_submit {
    transition-duration: 0.4s;
    margin: 10px;
    width: 60px;
    height: 36px;
    background-color: #2c7fff;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: #2c7fff;
    cursor: pointer;
    :hover {
      background-color: #e8e8e8; /* Green */
      color: black;
    }
  }
`;

const Selector = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 11px 0px 10px 20px;
  > select {
    display: inline-block;

    border: 0px;
    font-size: 14px;
    font-weight: 700;
    color: #222222;
  }
`;
const Title = styled.div`
  padding: 11px 0px 10px 20px;
  border-bottom: 1px solid #e8e8e8;
  .title {
    width: 324px;
    font-size: 14px;
    font-weight: 500;
    border: 0;
  }
`;
const Content = styled.div`
  padding: 11px 0px 10px 20px;

  border-bottom: 1px solid #e8e8e8;
  .content {
    width: 320px;
    border: none;
    resize: none;
    height: 300px;
  }
`;
