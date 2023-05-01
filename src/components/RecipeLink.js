import { useState } from "react";
import Button from "./Button";

const RecipeLink = ({ isEdit, ingredient }) => {
  const getIngredients = (str) => {
    const koreanPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]+/g;
    const ingredients = str.match(koreanPattern);
    return ingredients;
  };

  const makeCupangLinks = (arr) => {
    const result = [];
    arr.map((ingredient) => {
      const link = `https://www.coupang.com/np/search?q=${ingredient}&channel=recent`;
      result.push(
        <button
          className="cupang_link"
          onClick={() => window.open(link, `_blank`)}
        >
          {ingredient}
        </button>
      );
    });
    return result;
  };

  if (isEdit && ingredient) {
    const ingredients = getIngredients(ingredient);
    if (ingredients !== null) {
      const cupanglinks = makeCupangLinks(ingredients);
      return <div>{cupanglinks}</div>;
    }
  }
};

export default RecipeLink;
