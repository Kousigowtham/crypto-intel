const updateSignalListLoader = (state = false, action) => {
  if (action.type === "UPDATE_SIGNAL_LIST_LOADER") return action.payload;

  return state;
};

export default updateSignalListLoader;
