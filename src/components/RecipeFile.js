import Button from "./Button";
import { useNavigate } from "react-router-dom";
import React from "react";

const RecipeFile = ({ id, imageSource, imageName }) => {
  const navigate = useNavigate();

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="RecipeItem">
      <div onClick={goEdit} className="recipe_img_preview">
        <Button isPreview={true} imageSource={imageSource} />
        <div className="recipeitem_imagename">{imageName}</div>
      </div>
    </div>
  );
};

export default RecipeFile;
