import modalReducer from "./slices/modal/modalReducer";
import { reducer as formReducer } from "redux-form";
import projetReducer from "./slices/projets/projectReducer";

const rootReducer = {
  form: formReducer,
  modal: modalReducer,
  projet: projetReducer,
};

export default rootReducer;
