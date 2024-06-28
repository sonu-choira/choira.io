import React from "react";
import style from "../../pages/admin/studios/studio.module.css";
import CustomSelect from "../../pages/admin/layout/CustomSelect";
import CustomInput from "../../pages/admin/layout/CustomInput";
import upload from "../../assets/upload.svg";
import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";
import { useFormik } from "formik";
import appAndmoreApi from "../../services/appAndmoreApi";
import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";
import StudioFooter from "../adminStudio/StudioFooter";
import * as Yup from "yup";
import { bannerSchema } from "../../schemas";
import { useEffect } from "react";
import imageUploadapi from "../../services/imageUploadapi";

function AddNewBanner({ setShowAddPage }) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      redirectType: "",
      redirectUrl: "",
      bannerImage: "",
      bannerName: "",
      bannerDescription: "",
      bannerType: "",
      bannerStatus: "",
      studioId: "",
      specify: "",
      tempStudioName: "", // Used only for display
    },
    validationSchema: bannerSchema,
    onSubmit: (values) => {
      console.log(values);
      // alert("Form submitted");
      let sendDataToApi = {};

      Object.keys(values).map((key) => {
        if (`${values[key]}`.length > 0) {
          sendDataToApi[key] = values[key];
        }
      });
      console.log("sendDataToApi", sendDataToApi);
    },
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        errorAlert("File size should be less than 1MB");
        event.target.value = "";
        return;
      }
      imageUploadapi
        .singleImgUpload(file)
        .then((response) => {
          console.log("Image links created:", response.imageUrl);
          setFieldValue("bannerImage", response.imageUrl);
          sucessAlret("Image uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          errorAlert("Error uploading image");
        });
    }
  };

  const handelStudioChange = (newValue) => {
    setFieldValue("studioId", newValue.value);
    setFieldValue("tempStudioName", newValue.label);
  };

  async function fetchUserList(username) {
    let dataToSend = {
      searchText: username,
    };
    try {
      const response = await appAndmoreApi.filterData(dataToSend);
      return response.studios.map((data) => ({
        label: `${data.fullName}`,
        value: data._id,
      }));
    } catch (error) {
      console.error("Error fetching user list:", error);
      return []; // return empty array in case of error
    }
  }

  return (
    <form style={{ width: "100%", height: "95%" }} onSubmit={handleSubmit}>
      <div className={style.AddNewBannerPage}>
        <div>
          <span>Add New Banner:</span>
        </div>
        <div className={style.AddNewBannerMain}>
          <div>
            <label htmlFor="image">
              Upload Image
              <div className={style.AddBannerImage}>
                {values.bannerImage ? (
                  <img
                    src={values.bannerImage}
                    alt="banner"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div>
                    <img src={upload} alt="upload" />
                    <p>
                      Drag and Drop or <br /> <span>Browse</span> to upload.
                    </p>
                  </div>
                )}
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                id="image"
                onChange={handleFileUpload}
                onBlur={handleBlur}
              />
            </label>
            <br />
            <div className={style.error}>{errors.bannerImage}</div>
          </div>
          <div>
            <CustomSelect
              label={"Select Redirect Type"}
              options={["in-App", "External"]}
              name={"redirectType"}
              id={"redirectType"}
              htmlFor={"redirectType"}
              defaultOption={"select redirect type"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.redirectType}
              error={errors.redirectType}
              touched={touched.redirectType}
            />

            {values.redirectType === "External" && (
              <CustomInput
                label={"Redirect Link"}
                name={"redirectUrl"}
                id={"redirectUrl"}
                htmlFor={"redirectUrl"}
                placeholder={"enter redirect link"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.redirectUrl}
                error={errors.redirectUrl}
                touched={touched.redirectUrl}
              />
            )}
            {values.redirectType === "in-App" && (
              <>
                <CustomSelect
                  label={"Banner Type"}
                  name={"bannerType"}
                  id={"bannerType"}
                  htmlFor={"bannerType"}
                  defaultOption={"select banner type"}
                  options={["studio", "mix-master", "music-production"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bannerType}
                  error={errors.bannerType}
                  touched={touched.bannerType}
                />

                <CustomSelect
                  label={"Specify"}
                  name={"specify"}
                  id={"specify"}
                  htmlFor={"specify"}
                  defaultOption={"select specify"}
                  options={["Particular", "List"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.specify}
                  error={errors.specify}
                  touched={touched.specify}
                />

                {values.specify === "Particular" && (
                  <div className={style.customInput}>
                    <label htmlFor="UserName">Studio Name</label>
                    <SearchSelectInput
                      placeholder="Search Studio"
                      fetchOptions={fetchUserList}
                      onChange={handelStudioChange}
                      defaultValue={values?.tempStudioName}
                      style={{ width: "100%", height: "100%" }}
                    />
                    {errors.studioId && touched.studioId && (
                      <div className={style.error}>{errors.studioId}</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <StudioFooter
          backOnclick={() => {
            setShowAddPage(false);
          }}
          saveDisabled={false}
        />
      </div>
    </form>
  );
}

export default AddNewBanner;
