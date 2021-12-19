//_______________________________________________________________________________
// get metaData Action
//_______________________________________________________________________________

export const getMetaDataRequest = () => ({
  type: "METADATA_REQUEST",
});

export const getMetaDataSuccess = (MetaData) => ({
  type: "METADATA_SUCCESS",
  payload: MetaData,
});

export const getMetaDataFailure = (error) => ({
  type: "METADATA_FAILURE",
  payload: error,
});

export const GET_METADATA_ACTION = (payload) => ({
  type: "GET_METADATA",
  payload: payload,
});

//_______________________________________________________________________________
// get coinList Action
//_______________________________________________________________________________

export const getCoinListRequest = () => ({
  type: "COINLIST_REQUEST",
});

export const getCoinListSuccess = (coinlist) => ({
  type: "COINLIST_SUCCESS",
  payload: coinlist,
});

export const getCoinListFailure = (error) => ({
  type: "COINLIST_FAILURE",
  payload: error,
});

//_______________________________________________________________________________
// get signalList Action
//_______________________________________________________________________________

export const getSignalListRequest = () => ({
  type: "SIGNALLIST_REQUEST",
});

export const getSignalListSuccess = (signalList) => ({
  type: "SIGNALLIST_SUCCESS",
  payload: signalList,
});

export const getSignalListFailure = (error) => ({
  type: "SIGNALLIST_FAILURE",
  payload: error,
});

export const SET_SIGNALDATA_ACTION = (payload) => ({
  type: "SET_SIGNAL_DATA",
  payload: payload,
});

export const UPDATE_SIGNAL_ACTION = (payload) => ({
  type: "UPDATE_SIGNAL",
  payload: payload,
});
export const UPDATE_SIGNAL_LIST_LOADER_ACTION = (payload) => ({
  type: "UPDATE_SIGNAL_LIST_LOADER",
  payload: payload,
});
