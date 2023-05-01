import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeStateContext } from "../App";

import Header from "./../components/Header";
import Button from "./../components/Button";
import RecipeList from "./../components/RecipeList";

const Home = () => {
  const recipeList = useContext(RecipeStateContext);

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `My Recipe`;
  }, []);

  useEffect(() => {
    if (recipeList.length >= 1) {
      setData(recipeList);
    }
  }, [recipeList]);

  return (
    <div>
      <Header
        lefttop1={<Button type={"back"} onClick={() => navigate(-1)} />}
        lefttop2={<Button type={`home`} onClick={() => navigate(`/`)} />}
        searchWindow={
          <input
            type="text"
            id="search_window_input"
            placeholder="검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        }
        righttop1={<Button type={`new`} onClick={() => navigate(`/new`)} />}
        righttop2={
          <Button type={`new_file`} onClick={() => navigate(`/folder/:id`)} />
        }
      />
      <RecipeList recipeList={data} searchValue={searchValue} />
    </div>
  );
};

export default Home;
