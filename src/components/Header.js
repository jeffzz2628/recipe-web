const Header = ({
  recipeName,
  searchWindow,
  lefttop1,
  lefttop2,
  lefttop3,
  righttop1,
  righttop2,
  righttop3,
}) => {
  console.log(lefttop1);
  return (
    <header>
      <section className="head_left">
        <div className="head_btn_left_1">{lefttop1}</div>
        <div className="head_btn_left_2">{lefttop2}</div>
        <div className="head_btn_left_3">{lefttop3}</div>
      </section>
      <section className="head_center">
        <div className="head_search_window">{searchWindow}</div>
        <div className="recipe_name">{recipeName}</div>
      </section>
      <section className="head_right">
        <div className="head_btn_right_1">{righttop1}</div>
        <div className="head_btn_right_2">{righttop2}</div>
        <div className="head_btn_right_3">{righttop3}</div>
      </section>
    </header>
  );
};

export default Header;
