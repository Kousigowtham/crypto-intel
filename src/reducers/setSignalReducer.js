const setSignalReducer = (state = null, action) => {
  if (action.payload === null) return null;

  if (action.type === "SET_SIGNAL_DATA")
    return {
      ...action.payload,
    };

  return state;
};

export default setSignalReducer;
