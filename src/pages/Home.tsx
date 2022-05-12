import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CategorieTab from "../components/CategoryTab";
import Post from "../components/Post";

const Home = () => {
  const [categorieDB, setCategorieDB] = useState<any>([]);
  const [currentTab, setCurrntTab] = useState(0);

  const axios_GetCategorie = async () => {
    await axios
      .get("./data/Categories.json")
      .then((res) => setCategorieDB(res.data.CATEGORIES));
  };
  useEffect(() => {
    axios_GetCategorie();
  }, []);
  //console.log(categorieDB);
  return (
    <Container>
      <Header>커뮤니티</Header>
      <CategorieTab
        item={categorieDB}
        currentTab={currentTab}
        setCurrentTab={setCurrntTab}
      />
      <Item>
        <Post currentTab={currentTab} />
      </Item>
      <PostButton>글쓰기 ✍️</PostButton>
    </Container>
  );
};
export default Home;
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border: solid grey 1px;
  border-radius: 10px;
  width: 360px;
  height: 821px;
`;
const Header = styled.header`
  margin-top: 34px;
  margin-left: 30px;
  margin-bottom: 20px;
  width: 81px;
  line-height: 32px;
  height: 32px;
  font-weight: 700;
  font-size: 22px;
`;
const PostButton = styled.button`
  font-weight: 700;
  border: white;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px;
  position: fixed;
  width: 100px;
  height: 52px;
  background-color: #2c7fff;
  color: white;
  bottom: 12vh;
  right: 41vw;
`;
const Item = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
