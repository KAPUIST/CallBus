import styled from "styled-components";
import * as React from "react";
import { useState } from "react";

interface CategorieProps {
  item: [{ categoryPk: number; categoryName: string; categoryCode: string }];
}
const CategoryTab: React.FC<CategorieProps> = ({ item }) => {
  const [currentTab, setCurrntTab] = useState(0);

  const handleBtnClick = (index: number) => {
    setCurrntTab(index);
  };
  console.log(item);
  //console.log(index, "index");
  return (
    <ButtonGroup>
      <Button>
        {item.map((el, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? "submenu focused" : "submenu"}
              onClick={() => handleBtnClick(index)}
            >
              {el.categoryName}
            </li>
          );
        })}
        {/* <Button onClick={() => handleBtnClick(item.categoryPk)}>
        {item.categoryName}
      </Button> */}
      </Button>
    </ButtonGroup>
  );
};
const ButtonGroup = styled.div`
  padding-left: 20px;
`;
const Button = styled.ul`
  display: flex;
  white-space: nowrap;
  overflow: auto;
  .submenu {
    margin-left: 2px;
    background: #ffffff;
    padding: 12px 16px;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    height: 100%;
    float: left;
    list-style: none;
    cursor: pointer;
  }

  .focused {
    background-color: #2c7fff;
    color: rgba(255, 255, 255, 1);
    transition: 0.3s;
  }
`;

export default CategoryTab;
