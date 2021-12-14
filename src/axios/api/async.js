import { api } from "../index";

export async function getMetaData() {
  try {
    const response = await api.post("/metaData", {
      Headers: {
        contentType: "application/json",
      },
      body: {},
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCoinsList() {
  try {
    const response = await api.post(
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
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSignals() {
  try {
    const result = await api.post(
      "/signalAnalysisDetail/list",
      JSON.stringify({}),
      {
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createCoin(seketonSignal) {
  try {
    const result = await api.post(
      "/signal",
      JSON.stringify({ ...seketonSignal }),
      {
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
