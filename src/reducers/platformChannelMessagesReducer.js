import {
  getPlatformChannelMessagesFailure,
  getPlatformChannelMessagesRequest,
  getPlatformChannelMessagesSuccess,
} from "../actions";
import { api } from "../axios";

const initialState = {
  loading: false,
  platformChannelMessages: [],
  error: "",
};

const platformChannelMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLATFORMCHANNELMESSAGES_REQUEST":
      return { ...state, loading: true };
    case "PLATFORMCHANNELMESSAGES_SUCCESS":
      return {
        ...state,
        platformChannelMessages: action.payload,
        loading: false,
      };
    case "PLATFORMCHANNELMESSAGES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const fetchPlatformChannelMessages = (platformChannelId) => {
  return (dispatch) => {
    dispatch(getPlatformChannelMessagesRequest());
    api
      .post(
        "/platformChannelMessage/list",
        JSON.stringify({
          platformChannelInfoId: platformChannelId,
          sortBy: "date",
          sortType: "DESCENDING",
        }),
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(getPlatformChannelMessagesSuccess(res.data.data));
      })
      .catch((error) => dispatch(getPlatformChannelMessagesFailure(error)));
  };
};

export default platformChannelMessagesReducer;
