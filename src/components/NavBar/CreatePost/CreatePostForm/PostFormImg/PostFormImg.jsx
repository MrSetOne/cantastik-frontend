import {useState} from 'react'
import {message,Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'


const PostFormImg = ({setImage}) => {
  const [imageUrl, setImageUrl] = useState();
  
  const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    };
  
  const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
    
      const isLt2M = file.size / 1024 / 1024 < 2;
    
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      if(isJpgOrPng && isLt2M){
        setImage([file])
      }
      return false;
    };

    const handleChange = (info) => {
        getBase64(info.file,(url) => {
            setImageUrl(url);
          })
    }

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
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        >
        {imageUrl ? (
            <img
            src={imageUrl}
            alt="avatar"
            style={{
                width: '100%',
            }}
            />
        ) 
        :
        (
            uploadButton
        )}
        </Upload>
    )
}

export default PostFormImg