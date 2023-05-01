import "./App.css";
import React, { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useReducer } from "react";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case `INIT`: {
      return action.data;
    }
    case `CREATE`: {
      newState = [...state, action.data];
      break;
    }
    case `REMOVE`: {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case `EDIT`: {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem(`recipe`, JSON.stringify(newState));
  return newState;
};

const dummyData = [
  {
    id: 0,
    recipeName: "레시피 작성 예",
    recipeImage: "",
    ingredient:
      "떡볶이\n\n떡 800g, 어묵 160g, 양배추 160g, 대파 240g, 물1L, 삶은 달걀 3개\n\n양념장\n\n고추장 80g, 진간장 50g, 고춧가루 50g, 황설탕 70g, 미원 5g",
    recipe:
      "1. 대파는 어슷 썰거나 반으로 갈라 길게 썰어 준비한다. \n2. 양배추, 어묵은 먹기 좋은 크기로 썰어 준비한다.\n3. 냄비에 물, 진간장, 황설탕, 고추장, 굵은고춧가루, 고운고춧가루, 대파, 양배추를 넣어 끓인다.\n4. 떡볶이떡은 흐르는 물에 가볍게 세척한다.\n5. 육수가 끓으면 삶은달걀, 떡을 넣고 함께 끓여준다.\n6. 기호에 맞게 MSG를 넣는다.\n7. 떡을 넣고 육수가 끓어오르면 어묵을 넣어준다.\n8. 양념장이 걸쭉하게 졸아들 때까지 끓여 완성한다.",
    people: 1,
    date: 1681905870640,
  },
];

export const RecipeStateContext = React.createContext();
export const RecipeDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  // /* 로컬 스토리지 저장시 사용*/

  useEffect(() => {
    const localData = localStorage.getItem(`recipe`);
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  const dataId = useRef(2);
  // CREATE
  const onCreate = (
    recipeName,
    recipeImage,
    date,
    ingredient,
    people,
    recipe,
    folder
  ) => {
    dispatch({
      type: `CREATE`,
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        recipeName,
        recipeImage,
        ingredient,
        people,
        recipe,
        folder,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: `REMOVE`, targetId });
  };

  // EDIT
  const onEdit = (
    targetId,
    recipeName,
    recipeImage,
    date,
    ingredient,
    people,
    recipe,
    folder
  ) => {
    dispatch({
      type: `EDIT`,
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        recipeName,
        recipeImage,
        ingredient,
        people,
        recipe,
        folder,
      },
    });
  };

  return (
    <RecipeStateContext.Provider value={data}>
      <RecipeDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
              <Route path={process.env.PUBLIC_URL + "/new"} element={<New />} />

              <Route
                path={process.env.PUBLIC_URL + "/edit/:id"}
                element={<Edit />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </RecipeDispatchContext.Provider>
    </RecipeStateContext.Provider>
  );
}

export default App;
