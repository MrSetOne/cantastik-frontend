import { useEffect } from "react";
import ImgCrop from "antd-img-crop";
import { message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PostFormImg = ({ setImage, image, imageUrl, setImageUrl }) => {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    if (isJpgOrPng && isLt2M) {
      // ! AQUI ES DONDE SE ESTABLECE LA IMAGEN QUE SE VA A MANDAR
      setImage([file]);
    }
    return false;
  };

  useEffect(() => {
    if (image[0]) {
      getBase64(image[0], (url) => {
        setImageUrl(url);
      });
    }
  }, [image]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <ImgCrop>
      <Upload
        style={{ width: "min-content" }}
        maxCount={1}
        fileList={image}
        name="avatar"
        defaultFileList={[]}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        multiple={false}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  );
};

export default PostFormImg;
