const Button = ({ type, onClick, isPreview, imageSource }) => {
  const btnType = [
    `back`,
    `home`,
    `edit`,
    `garbage`,
    `more`,
    `setting`,
    `image_upload`,
    `new_file`,
    `new`,
    `save`,
    `delete`,
    `ingredient`,
  ].includes(type)
    ? type
    : `default`;

  if (isPreview) {
    return (
      <button className={"PreviewImage"} onClick={onClick}>
        <img
          className={"preview_img"}
          src={imageSource || `${process.env.PUBLIC_URL}/images/1.png`}
        />
      </button>
    );
  } else {
    return (
      <button className={"Button"} onClick={onClick}>
        <img
          className={"btn_img"}
          src={`${process.env.PUBLIC_URL}/icons/${btnType}.svg`}
        />
      </button>
    );
  }
};

export default Button;
