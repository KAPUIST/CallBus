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
  const [photo, setPhoto] = useState<string[]>([]);
  //console.log(selectCategoriePk, selectCategorieName);
  const localData: any = localStorage.getItem("Data");
  const data = JSON.parse(localData);
  //console.log(photo, "data");
  const findMaxPk = () => {
    console.log(data);
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].pk);
    }
    setPk(Math.max(...arr) + 1);
  };

  const getFullYmdStr = () => {
    var d = new Date();
    return d.toISOString();
  };

  const handleBackArrow = () => {
    navigator("/community/list");
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    } else if (e.target.value === "미선택") {
      setSelectCategorieNmae("");
      setSelectCategoriePk(0);
    }
  };
  const handleSubmit = () => {
    if (selectCategoriePk && titleContent && textContent) {
      let titleChar = titleContent.charAt(0);
      let contentChar = textContent.charAt(0);
      //console.log(titleChar);
      if (titleChar === " " || contentChar === " ") {
        return swal("첫글자로는 공백을 입력할수 없습니다.");
      } else if (photo.length === 0) {
        const newPost = {
          categortPk: selectCategoriePk,
          categoryName: selectCategorieName,
          pk: pk,
          title: titleContent,
          content: textContent,
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          imageUrl: null,
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
      }
    }
  };
  const handleImageUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let result = photo.concat();

      let image: File[] = Array.from(event.target.files);

      if (image.length > 6 || image.length + result.length > 6) {
        return swal("이미지는 6개이상 등록할수 없습니다.");
      } else if (result.length >= 6) {
        return swal("이미지는 6개이상 등록할수 없습니다.");
      } else {
        for (let i = 0; i < image.length; i++) {
          result.unshift(`../../../${image[i].name}`);
        }
        setPhoto(result);
        event.target.value = "";
      }
    }
  };
  const handleOnInput = (
    e: React.FormEvent<HTMLInputElement>,
    maxlength: number
  ) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length > maxlength) {
      target.value = target.value.substring(0, maxlength);
    }
  };
  const handleImageDelete = (index: number) => {
    let result = photo.concat();
    result.splice(index, 1);
    setPhoto(result);
    //console.log(result, "data");
    //console.log(index);
  };
  useEffect(() => {
    findMaxPk();
  }, []);
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
        <button
          className={
            selectCategoriePk && titleContent && textContent
              ? "make_post_submit"
              : "cant_make_submit"
          }
          disabled={
            selectCategoriePk && titleContent && textContent ? false : true
          }
          onClick={handleSubmit}
        >
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
          onInput={(e) => handleOnInput(e, 99)}
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
        <ImageContainer>
          <Images>
            {photo.map((el, key) => {
              return (
                <li key={key}>
                  <div className="image_box">
                    <img
                      className="upload_image"
                      src={el}
                      alt="upload_image"
                    ></img>
                    <button
                      className="image_delete"
                      onClick={() => handleImageDelete(key)}
                    >
                      X
                    </button>
                  </div>
                </li>
              );
            })}
          </Images>
        </ImageContainer>

        <MakePhoto>
          <label className="input_file_button" htmlFor="input_file">
            <div className="post_photo">
              <img
                className="post_photo_icon"
                src="../../../image-icon.svg"
                alt="content_view"
              ></img>
              <div className="photo_count">사진({photo.length}/6)</div>
            </div>
          </label>
          <input
            type="file"
            id="input_file"
            multiple
            style={{ display: "none" }}
            onChange={(event) => {
              handleImageUploader(event);
            }}
          />
        </MakePhoto>
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
  .cant_make_submit {
    margin: 10px;
    width: 60px;
    height: 36px;
    background-color: #e8e8e8;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: #2c7fff;
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
const ImageContainer = styled.div`
  padding-left: 15px;
`;
const Images = styled.ul`
  display: flex;
  white-space: nowrap;
  overflow: auto;

  list-style: none;
  .image_box {
    position: relative;
  }
  .upload_image {
    padding: 8px;
    width: 89px;
    height: 83px;
    border-radius: 4px;
    white-space: nowrap;
    overflow: auto;
  }
  .image_delete {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    border: white;
    color: white;
    cursor: pointer;
  }
`;
const MakePhoto = styled.div`
  display: flex;
  > label {
    transition-duration: 0.4s;
    padding: 9px 9px 9px 9px;
    background-color: #dbe9ff;
    border-radius: 6px;
    color: #2c7fff;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    :hover {
      background-color: #2c7fff; /* Green */
      color: white;
    }
    .photo_count {
      display: inline-block;
      margin-left: 10px;
    }
    .post_photo_icon {
      width: 15px;
      height: 15px;
    }
  }
`;
