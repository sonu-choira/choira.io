// import React from "react";
// import style from "../../pages/admin/studios/studio.module.css";
// import CustomSelect from "../../pages/admin/layout/CustomSelect";
// import CustomInput from "../../pages/admin/layout/CustomInput";
// import upload from "../../assets/upload.svg";
// import { errorAlert, sucessAlret } from "../../pages/admin/layout/Alert";
// import { useFormik } from "formik";
// import appAndmoreApi from "../../services/appAndmoreApi";
// import SearchSelectInput from "../../pages/admin/layout/SearchAndSelectInput";
// import StudioFooter from "../adminStudio/StudioFooter";
// import * as Yup from "yup";
// import { bannerSchema } from "../../schemas";
// import { useEffect } from "react";
// import imageUploadapi from "../../services/imageUploadapi";
// import promotionApi from "../../services/promotionApi";
// import { send } from "react-ga";
// import { useNavigate } from "react-router-dom";
// import MixMaster from "../adminStudio/booking/MixMaster";

// function AddNewBanner({
//   setShowAddPage,
//   pageType,
//   editMode,
//   editData,
//   setEditData,
// }) {
//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     setFieldValue,
//     setValues,
//   } = useFormik({
//     initialValues: editMode.current
//       ? editData
//       : {
//           banner_redirect: "",
//           redirectURL: "",
//           photoURL: "",
//           name: "",
//           type: pageType,
//           bannerType: "",
//           entity_id: "",
//           forr: "",
//           tempStudioName: "", // Used only for display
//           active: "",
//           stage: "",
//         },
//     validationSchema: bannerSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       // alert("Form submitted");
//       let sendDataToApi = {};

//       Object.keys(values).map((key) => {
//         if ((`${values[key]}`.length > 0) & (values[key] !== null)) {
//           sendDataToApi[key] = values[key];
//         }
//       });
//       sendDataToApi.active = parseInt(sendDataToApi.active);
//       sendDataToApi.stage = parseInt(sendDataToApi.stage);
//       console.log("sendDataToApi", sendDataToApi);
//       hitapi(sendDataToApi);
//     },
//   });
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (editMode.current) {
//       const resetValues = {
//         banner_redirect: values.banner_redirect,
//         id: values.id,
//         redirectURL: "",
//         photoURL: values.photoURL,
//         name: "",
//         type: pageType,
//         bannerType: "",
//         entity_id: "",
//         forr: "",
//         tempStudioName: "", // Used only for display
//         active: "",
//         stage: "",
//       };
//       setValues(resetValues);
//     } else {
//       const resetValues = {
//         banner_redirect: values.banner_redirect,
//         redirectURL: "",
//         photoURL: values.photoURL,
//         name: "",
//         type: pageType,
//         bannerType: "",
//         entity_id: "",
//         forr: "",
//         tempStudioName: "", // Used only for display
//         active: "",
//         stage: "",
//       };
//       setValues(resetValues);
//       console.log("pageType", pageType);
//     }
//   }, [values.banner_redirect]);

//   useEffect(() => {
//     if (editMode.current) {
//       setValues(editData);
//       setFieldValue("forr", editData.for);
//     }
//     console.log("editData", editData);
//   }, [editData, editMode, setValues]);
//   useEffect(() => {
//     console.log("values", values);
//   }, [values]);
//   useEffect(() => {
//     setFieldValue("type", pageType);
//   }, [pageType]);

//   const hitapi = (sendDataToApi) => {
//     console.log("Api hit", sendDataToApi);
//     if (editMode.current) {
//       promotionApi
//         .updateBanner(sendDataToApi)
//         .then((res) => {
//           console.log(res);
//           if (res.status) {
//             sucessAlret("Banner Updated Successfully");
//           } else {
//             errorAlert(res.message || "Error in updating banner");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           errorAlert("Error in updating banner");
//         });
//     } else {
//       console.log("Create Banner");
//       promotionApi
//         .createBanner(sendDataToApi)
//         .then((res) => {
//           console.log(res);
//           if (res.status == true) {
//             sucessAlret("Banner Created Successfully");
//           } else {
//             errorAlert(res.message || "Error in creating banner");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           errorAlert(err.message);
//         });
//     }
//   };
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 1048576) {
//         errorAlert("File size should be less than 1MB");
//         event.target.value = "";
//         return;
//       }
//       imageUploadapi
//         .singleImgUpload(file)
//         .then((response) => {
//           console.log("Image links created:", response.imageUrl);
//           setFieldValue("photoURL", response.imageUrl);
//           sucessAlret("Image uploaded successfully");
//         })
//         .catch((error) => {
//           console.error("Error uploading image:", error);
//           errorAlert("Error uploading image");
//         });
//     }
//   };
//   const findStudioName = async (dataToSend, searchType) => {
//     let data = {};
//     if (searchType) {
//       data = {
//         [searchType]: dataToSend,
//       };
//     } else {
//       data = {
//         searchText: dataToSend,
//       };
//     }
//     try {
//       const response = await appAndmoreApi.filterData(data);
//       return response.studios.map((data) => ({
//         label: `${data.fullName}`,
//         value: data._id,
//       }));
//     } catch (error) {
//       console.error("Error fetching user list:", error);
//       return []; // return empty array in case of error
//     }
//   };

//   const handelStudioChange = (newValue) => {
//     setFieldValue("entity_id", newValue.value);
//     setFieldValue("tempStudioName", newValue.label);
//   };

//   async function fetchUserList(username) {
//     // let dataToSend = {
//     //   searchText: username,
//     // };
//     return findStudioName(username);
//   }
//   useEffect(() => {
//     if (editMode.current) {
//       console.log(values?.entity_id);
//       findStudioName(values?.entity_id, "id")
//         .then((data) => {
//           console.log("-------------------------data", data[0].label);

//           // Assuming data is an array with objects containing 'label' and 'value'
//           if (data && data.length > 0) {
//             setFieldValue("tempStudioName", data[0].label);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [editMode.current, values]);

//   return (
//     <>
//       <form style={{ width: "100%", height: "95%" }} onSubmit={handleSubmit}>
//         <div className={style.AddNewBannerPage}>
//           <div>
//             <span>Add New Banner:</span>
//           </div>
//           <div className={style.AddNewBannerMain}>
//             <div>
//               <label htmlFor="image">
//                 Upload Image
//                 <div className={style.AddBannerImage}>
//                   {values.photoURL ? (
//                     <img
//                       src={values.photoURL}
//                       alt="banner"
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   ) : (
//                     <div>
//                       <img src={upload} alt="upload" />
//                       <p>
//                         Drag and Drop or <br /> <span>Browse</span> to upload.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//                 <input
//                   style={{ display: "none" }}
//                   type="file"
//                   id="image"
//                   onChange={handleFileUpload}
//                   onBlur={handleBlur}
//                 />
//               </label>
//               <br />
//               <div className={style.error}>{errors.photoURL}</div>
//             </div>
//             <div
//               style={{
//                 maxHeight: "60vh",
//                 overflowY: "auto",
//                 paddingRight: "10px",
//               }}
//             >
//               <CustomSelect
//                 label={"Select Redirect Type"}
//                 options={["in-app", "external"]}
//                 name={"banner_redirect"}
//                 id={"banner_redirect"}
//                 htmlFor={"banner_redirect"}
//                 defaultOption={"select redirect type"}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.banner_redirect}
//                 error={errors.banner_redirect}
//                 touched={touched.banner_redirect}
//               />

//               {values.banner_redirect === "external" ||
//               values.banner_redirect === "in-app" ? (
//                 <>
//                   <CustomInput
//                     label={"Banner Name"}
//                     name={"name"}
//                     id={"bname"}
//                     htmlFor={"bname"}
//                     placeholder={"enter Banner Name"}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.name}
//                     error={errors.name}
//                     touched={touched.name}
//                   />
//                   <CustomSelect
//                     label={"Status"}
//                     name={"active"}
//                     id={"Status"}
//                     htmlFor={"Status"}
//                     defaultOption={"select Status "}
//                     options={{ active: 1, inactive: 0 }}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.active}
//                     error={errors.active}
//                     touched={touched.active}
//                   />
//                   <CustomSelect
//                     label={"Stage"}
//                     name={"stage"}
//                     id={"Stage"}
//                     htmlFor={"Stage"}
//                     defaultOption={"select Stage "}
//                     options={[1, 2, 3, 4]}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.stage}
//                     error={errors.stage}
//                     touched={touched.stage}
//                   />
//                 </>
//               ) : (
//                 ""
//               )}

//               {values.banner_redirect === "external" && (
//                 <CustomInput
//                   label={"Redirect Link"}
//                   name={"redirectURL"}
//                   id={"redirectURL"}
//                   htmlFor={"redirectURL"}
//                   placeholder={"enter redirect link"}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.redirectURL}
//                   error={errors.redirectURL}
//                   touched={touched.redirectURL}
//                 />
//               )}
//               {values.banner_redirect === "in-app" && (
//                 <>
//                   <CustomSelect
//                     label={"Specify"}
//                     name={"forr"}
//                     id={"forr"}
//                     htmlFor={"forr"}
//                     defaultOption={"select specify"}
//                     // options={["Particular", "List"]}
//                     options={{
//                       Particular: "page",
//                       List: "list",
//                     }}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.forr || values.for}
//                     error={errors.forr}
//                     touched={touched.forr}
//                   />

//                   {values.forr === "page" && (
//                     <div className={style.customInput}>
//                       <label htmlFor="UserName">Studio Name</label>
//                       <SearchSelectInput
//                         placeholder="Search Studio"
//                         fetchOptions={fetchUserList}
//                         onChange={handelStudioChange}
//                         defaultValue={
//                           values?.tempStudioName || values?.entity_id
//                         }
//                         style={{ width: "100%", height: "100%" }}
//                       />
//                       {errors.entity_id && touched.entity_id && (
//                         <div className={style.error}>{errors.entity_id}</div>
//                       )}
//                     </div>
//                   )}

//                   {values.forr === "list" && (
//                     <CustomSelect
//                       label={"Select List"}
//                       name={"entity_id"}
//                       id={"entity_id"}
//                       htmlFor={"entity_id"}
//                       defaultOption={"select List"}
//                       options={{
//                         Studio: "c1",
//                         MusicProduction: "c2",
//                         MixMaster: "c3",
//                       }}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       value={values.entity_id}
//                       error={errors.entity_id}
//                       touched={touched.entity_id}
//                     />
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <StudioFooter
//           backOnclick={() => {
//             setShowAddPage(false);
//             navigate("/adminDashboard/Promotions/Banner");
//             editMode.current = false;
//           }}
//           saveDisabled={false}
//           saveType={"submit"}
//         />
//       </form>
//     </>
//   );
// }

// export default AddNewBanner;
