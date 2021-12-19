import {
  getCoinListFailure,
  getCoinListRequest,
  getCoinListSuccess,
} from "../actions";
import { api } from "../axios";

const initialState = {
  loading: false,
  coinList: [],
  error: "",
};

const coinListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COINLIST_REQUEST":
      return { ...state, loading: true };
    case "COINLIST_SUCCESS":
      return { ...state, coinList: action.payload, loading: false };
    case "COINLIST_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const fetchCoinList = () => {
  return (dispatch) => {
    dispatch(getCoinListRequest());
    api
      .post(
        "/coin/list",
        JSON.stringify({
          exchange: "BINANCE",
          platform: "BINANCE_API",
          limit: 4000,
        }),
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(getCoinListSuccess(res.data.data.data));
      })
      .catch((error) => dispatch(getCoinListFailure(error)));
  };
};

export default coinListReducer;
