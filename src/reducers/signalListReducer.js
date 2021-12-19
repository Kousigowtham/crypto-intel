import {
  getSignalListFailure,
  getSignalListRequest,
  getSignalListSuccess,
} from "../actions";
import { api } from "../axios";

const initialState = {
  loading: false,
  signalList: [],
  error: "",
};

const signalListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNALLIST_REQUEST":
      return { ...state, loading: true };
    case "SIGNALLIST_SUCCESS":
      return { ...state, signalList: action.payload, loading: false };
    case "SIGNALLIST_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const fetchSignalList = () => {
  return (dispatch) => {
    dispatch(getSignalListRequest());
    api
      .post("/signalAnalysisDetail/list", JSON.stringify({}), {
        headers: {
          "content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("fetching...");
        dispatch(getSignalListSuccess(res.data.data.data));
      })
      .catch((error) => dispatch(getSignalListFailure(error)));
  };
};

export default signalListReducer;
