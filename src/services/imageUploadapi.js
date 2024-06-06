import api from "./api";


import axios from 'axios';
import FormData from 'form-data';
import Swal from "sweetalert2";

class imgapi {
  multipleImgUpload = async (imgfile) => {
    console.log("imgfile Mila hai", imgfile);
    const response = {}
    try {
      const formData = new FormData();
      imgfile.forEach((file) => {
        formData.append("newImages", file);
      });

      const config = {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}` ,
          
        

         
        }
      };

      const response = await api.post(
        "upload-multiple-images",
        formData,
        config
      );

      console.log("multiple image postdata ===>", response.data);
      response.status = true
      return response.data;
    } catch (error) {
      console.error("Error uploading multiple images:", error.toJSON().message);
      if(error.toJSON().message == "Network Error"){
        // alert("Check your internet connection or Image size")
        Swal.fire({
          icon: "error",
          title: "Network Error or Image size",
          text: "Check your internet connection or Image size",
          showConfirmButton: true,
        });
      }
     
      // throw error;
       response.status = false
       return response
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
