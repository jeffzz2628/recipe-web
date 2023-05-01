import { useRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeDispatchContext } from "./../App";

import Button from "./Button";
import Header from "./Header";
import ImageUploader from "./ImageUploader";
import RecipeLink from "./RecipeLink";

const getStrDate = (date) => {
  return date.toISOString();
};

const RecipeEditor = ({ isEdit, currentData }) => {
  const navigate = useNavigate();
  const peopleRef = useRef();

  const [date, setDate] = useState(getStrDate(new Date()));
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [people, setPeople] = useState(1);
  const [recipe, setRecipe] = useState("");

  const { onCreate, onEdit, onRemove } = useContext(RecipeDispatchContext);

  const multiplyNumbersInString = (string, people) => {
    return string.replace(/\d/g, (num) => {
      return num * people;
    });
  };

  const onSubmit = () => {
    if (recipeName && recipe && ingredient) {
      if (window.confirm(isEdit ? "레시피 수정 완료" : "레시피 작성 완료")) {
        if (!isEdit) {
          onCreate(recipeName, recipeImage, date, ingredient, people, recipe);
        } else {
          onEdit(
            currentData.id,
            recipeName,
            recipeImage,
            date,
            ingredient,
            people,
            recipe
          );
        }
      }
    } else {
      window.alert("빈 칸을 채워주시길 바랍니다");
      return;
    }
    navigate("/", { replace: true });
  };

  const onDelete = () => {
    if (window.confirm("진짜 삭제하시겠습니까?")) {
      onRemove(currentData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStrDate(new Date(parseInt(currentData.date))));
      setRecipeName(currentData.recipeName);
      setIngredient(currentData.ingredient);
      setRecipe(currentData.recipe);
      setRecipeImage(currentData.recipeImage);
      setPeople(currentData.people);
    }
  }, [isEdit, currentData]);

  useEffect(() => {
    if (isEdit) {
      const multipliedIngredients = multiplyNumbersInString(
        currentData.ingredient,
        people
      );
      setIngredient(multipliedIngredients);
    }
  }, [isEdit, people]);

  useEffect(() => {
    if (!isEdit && people !== 1) {
      alert("새로운 레시피 작성은 1인분 기준으로 작성해 주십시요");
      setPeople(1);
    }
  }, [people]);

  useEffect(() => {
    if (people < 1) {
      alert("1인분 이상으로 작성해 주십시요");
      setPeople(1);
    }
  }, [people]);

  return (
    <div>
      <section className="editor_header">
        <Header
          lefttop1={<Button type={"back"} onClick={() => navigate(-1)} />}
          lefttop2={<Button type={"home"} onClick={() => navigate("/")} />}
          searchWindow={
            <input
              type="text"
              id="search_window_input"
              placeholder="레시피 이름은 이곳에 적어주세요!"
              value={recipeName || ""}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          }
          righttop1={<Button type={"save"} onClick={onSubmit} />}
          righttop2={<Button type={"delete"} onClick={onDelete} />}
        />
      </section>
      <section className="editor_main">
        <section className="editor_main_top">
          <div className="image_div">
            <ImageUploader
              handleRecipeImage={setRecipeImage}
              imageSource={recipeImage ? recipeImage : ""}
            />
          </div>
          <div className="ingredient">
            <textarea
              className="ingredient_item"
              value={ingredient || ""}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="재료는 한글로 단위는 g, ml (kg,l) 단위로 적어주세요"
            ></textarea>
          </div>
          <div className="link">
            <h3>쿠팡 링크</h3>
            <div className="link_body">
              <RecipeLink isEdit={isEdit} ingredient={ingredient} />
            </div>
          </div>
        </section>
        <section className="editor_main_center">
          <div className="editor_main_center_top">
            <input
              type="number"
              ref={peopleRef}
              id="number_of_people"
              placeholder="몇 인분"
              value={people || 1}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
          <div className="main_recipe">
            <textarea
              id="main_recipe"
              type="text"
              placeholder={
                "레시피는 이곳에 \n ex) 1. 물을 끓인다 \n      2. 면을 넣는다 "
              }
              value={recipe || ""}
              onChange={(e) => setRecipe(e.target.value)}
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default RecipeEditor;
