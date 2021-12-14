const metaDataReducer = (state = null, action) => {
  if (action.type === "GET_METADATA")
    return {
      ...action.payload,
    };
  return state;
};

export default metaDataReducer;
