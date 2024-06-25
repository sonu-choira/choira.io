import React, { useState } from "react";
import style from "../../pages/admin/studios/studio.module.css";
import CustomSelect from "../../pages/admin/layout/CustomSelect";
import { redirect } from "react-router-dom";
import CustomInput from "../../pages/admin/layout/CustomInput";
import upload from "../../assets/upload.svg";
import { errorAlert } from "../../pages/admin/layout/Alert";
import { useFormik } from "formik";
import appAndmoreApi from "../../services/appAndmoreApi";
import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";
import StudioFooter from "../adminStudio/StudioFooter";

function AddNewBanner({ setShowAddPage }) {
  const [bannerData, setBannerData] = useState({
    redirectType: "",
    redirectUrl: "",
    bannerImage: "",
    bannerName: "",
    bannerDescription: "",
    bannerType: "",
    bannerStatus: "",
    studioId: "",
    tempStudioName: "",
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: bannerData,
    onSubmit: (values) => {
      console.log(values);
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
      const imgUrl = URL.createObjectURL(file);
      setFieldValue("bannerImage", imgUrl);
      // setBannerData({ ...bannerData, bannerImage: imgUrl });
    }
  };
  const handelStudioChange = (newValue) => {
    // Handle user selection change here

    setFieldValue("studioId", newValue.value);
    setFieldValue("tempStudioName", newValue.label);
    console.log("Selected user:", newValue);
  };

  async function fetchUserList(username) {
    let dataToSend = {
      searchText: username,
    };
    try {
      const response = await appAndmoreApi.filterData(dataToSend);
      console.log("response.studio", response.studios);
      return response.studios.map((data) => ({
        label: `${data.fullName} `,
        value: data._id,
      }));
    } catch (error) {
      console.error("Error fetching user list:", error);
      return []; // return empty array in case of error
    }
  }
  return (
    <>
      <div style={{ width: "100%", height: "95%" }}>
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
                  onChange={(event) => {
                    handleFileUpload(event);
                  }}
                />
              </label>
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
                  />
                  {values.specify === "Particular" && (
                    <div className={style.customInput}>
                      <label htmlFor="UserName">Studio Name</label>
                      <SearchSelectInput
                        placeholder="Search Studio"
                        fetchOptions={fetchUserList}
                        onChange={handelStudioChange}
                        defaultValue={values?.tempStudioName}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <StudioFooter
          backOnclick={() => {
            setShowAddPage(false);
            // setShowTable(true);
          }}
          saveDisabled={true}
          // disabled={true}
          //   saveOnclick={handelSavebtn}
        />
      </div>
    </>
  );
}

export default AddNewBanner;
