import React, { useEffect, useContext, useState } from "react";
import RecipeEditor from "../components/RecipeEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `새로운 레시피`;
  }, []);

  return (
    <div>
      <RecipeEditor />
    </div>
  );
};

export default New;
