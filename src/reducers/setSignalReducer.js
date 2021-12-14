const setSignalReducer = (state = null, action) => {
  if (action.type === "SET_SIGNAL_DATA")
    return {
      ...action.payload,
    };

  return state;
};

export default setSignalReducer;
