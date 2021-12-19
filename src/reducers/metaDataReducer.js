import {
  getMetaDataFailure,
  getMetaDataRequest,
  getMetaDataSuccess,
} from "../actions";
import { api } from "../axios";

const initialState = {
  loading: false,
  metaData: {},
  error: "",
};

const metaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "METADATA_REQUEST":
      return { ...state, loading: true };
    case "METADATA_SUCCESS":
      return { ...state, metaData: action.payload, loading: false };
    case "METADATA_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const fetchMetaData = () => {
  return (dispatch) => {
    dispatch(getMetaDataRequest());
    api
      .post("/metaData", {
        Headers: {
          contentType: "application/json",
        },
        body: {},
      })
      .then((res) => {
        dispatch(getMetaDataSuccess(res.data.data.filterData));
      })
      .catch((error) => dispatch(getMetaDataFailure(error)));
  };
};

export default metaDataReducer;
