import { combineReducers } from "redux";
import coinListReducer from "./coinListReducer";
import metaDataReducer from "./metaDataReducer";
import platformChannelReducer from "./platformChannelReducer";
import setSignalReducer from "./setSignalReducer";
import signalListReducer from "./signalListReducer";
import updateSignalReducer from "./updateSignalReducer";

const rootReducer = combineReducers({
  metaData: metaDataReducer,
  coinList: coinListReducer,
  signalList: signalListReducer,
  signalData: setSignalReducer,
  updateSignal: updateSignalReducer,
  platformChannel: platformChannelReducer,
});

export default rootReducer;
