const signalListReducer = (state = null, action) => {
  if (action.type === "GET_SIGNALSLIST")
    return {
      ...action.payload,
    };

  return state;
};

export default signalListReducer;
