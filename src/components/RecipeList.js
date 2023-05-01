import React, { useState } from "react";
import RecipeFile from "./RecipeFile";

const sortOption = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const ControlMenu = React.memo(({ value, onChange, sortOption }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {sortOption.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const RecipeList = ({ recipeList, searchValue }) => {
  const [sortType, setSortType] = useState("latest");

  const getSearchedList = () => {
    const searchedList = [];
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date - a.date);
      } else {
        return parseInt(a.date - b.date);
      }
    };
    const tempList = JSON.parse(JSON.stringify(recipeList));
    const sortedList = tempList.sort(compare);

    sortedList.map((it) => {
      if (it.recipeName.includes(searchValue)) {
        searchedList.push(it);
      }
    });
    return searchedList;
  };

  return (
    <div className="RecipeList">
      <div className="left_top">
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          sortOption={sortOption}
        />
      </div>
      {getSearchedList().map((it) => (
        <RecipeFile
          key={it.id}
          {...it}
          imageSource={it.recipeImage}
          imageName={it.recipeName}
        ></RecipeFile>
      ))}
    </div>
  );
};

RecipeList.defaultProps = {
  recipeList: [],
};

export default RecipeList;
