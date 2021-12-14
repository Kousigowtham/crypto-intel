const coinListReducer = (state = null, action) => {
  if (action.type === "GET_COINLIST")
    return {
      ...action.payload,
    };

  return state;
};

export default coinListReducer;
