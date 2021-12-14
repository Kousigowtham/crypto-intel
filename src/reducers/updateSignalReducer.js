const updateSignalReducer = (state = false, action) => {
  if (action.type === "UPDATE_SIGNAL") return action.payload;

  return state;
};

export default updateSignalReducer;
