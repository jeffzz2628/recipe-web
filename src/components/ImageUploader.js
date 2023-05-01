import { useRef, useState } from "react";
import Button from "./Button";

const ImageUploader = ({ handleRecipeImage, imageSource }) => {
  const [imageToUpload, setImageToUpload] = useState("");

  const imageUploadRef = useRef();

  const handleClick = () => {
    imageUploadRef.current.click();
  };

  const imagePreview = () => {
    const file = imageUploadRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageToUpload(reader.result);
      handleRecipeImage(reader.result);
    };
  };

  if (!imageSource) {
    return (
      <div className="image_division">
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            ref={imageUploadRef}
            onChange={imagePreview}
          />
          <img
            className="image_preview"
            src={
              imageToUpload
                ? imageToUpload
                : `${process.env.PUBLIC_URL}/images/1.png`
            }
            alt="음식 사진 업로드"
          />
        </div>
        <div className="image_preview_upload">
          <Button type={"image_upload"} onClick={handleClick}></Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            ref={imageUploadRef}
            onChange={imagePreview}
          />
          <img
            className="image_preview"
            src={imageToUpload ? imageToUpload : imageSource}
            alt="음식 사진 업로드"
          />
        </div>
        <div className="image_preview_upload">
          <Button type={"image_upload"} onClick={handleClick}></Button>
        </div>
      </div>
    );
  }
};

export default ImageUploader;
