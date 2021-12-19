import { api } from "../index";

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
