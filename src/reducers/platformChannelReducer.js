import {
  getPlatformChannelFailure,
  getPlatformChannelRequest,
  getPlatformChannelSuccess,
} from "../actions";
import { api } from "../axios";

const initialState = {
  loading: false,
  platformChannel: [],
  error: "",
};

const platformChannelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLATFORMCHANNEL_REQUEST":
      return { ...state, loading: true };
    case "PLATFORMCHANNEL_SUCCESS":
      return { ...state, platformChannel: action.payload, loading: false };
    case "PLATFORMCHANNEL_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const fetchPlatformChannel = () => {
  return (dispatch) => {
    dispatch(getPlatformChannelRequest());
    api
      .post(
        "/platformChannelInfo/list",
        JSON.stringify({
          platforms: ["DISCORD"],
        }),
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(getPlatformChannelSuccess(res.data.data));
      })
      .catch((error) => dispatch(getPlatformChannelFailure(error)));
  };
};

export default platformChannelReducer;
