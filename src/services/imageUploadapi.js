import api from "./api";


import axios from 'axios';
import FormData from 'form-data';

class imgapi {
  multipleImgUpload = async (imgfile) => {
    console.log("imgfile Mila hai", imgfile);

    try {
      const formData = new FormData();
      imgfile.forEach((file) => {
        formData.append("newImages", file);
      });

      const config = {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}` // Manually set the boundary
        }
      };

      const response = await api.post(
        "upload-multiple-images",
        formData,
        config
      );

      console.log("multiple image postdata ===>", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading multiple images:", error);
      throw error;
    }
  };

  singleImgUpload = async (imgfile) => {
    console.log("imgfile Mila hai", imgfile);

    try {
      const formData = new FormData();
      formData.append("newImage", imgfile); // Append single file with key "newImage"

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await api.post(
        "upload-single-image",
        formData,
        config
      );

      console.log("Single image upload response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading single image:", error);
      throw error;
    }
  };
}

export default new imgapi();
