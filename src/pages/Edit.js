import RecipeEditor from "../components/RecipeEditor";
import { RecipeStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [currentData, setCurrentData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const recipeList = useContext(RecipeStateContext);

  useEffect(() => {
    if (recipeList.length >= 1) {
      const targetRecipe = recipeList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetRecipe) {
        setCurrentData(targetRecipe);
      } else {
        alert("없는 일기입니다");
        navigate(`/`, { replace: true });
      }
    }
  }, [id, recipeList]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `레시피 수정`;
  }, []);

  return (
    <div>
      {currentData && <RecipeEditor isEdit={true} currentData={currentData} />}
    </div>
  );
};

export default Edit;
