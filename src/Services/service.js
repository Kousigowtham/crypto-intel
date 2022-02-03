export const dateConversion = (date) => {
  if (!date) return null;
  let formattedDate = new Date(date);
  formattedDate = [
    [
      formattedDate.getUTCDate() < 10
        ? `0${formattedDate.getUTCDate()}`
        : formattedDate.getUTCDate(),
      formattedDate.getUTCMonth() + 1 < 10
        ? `0${formattedDate.getUTCMonth() + 1}`
        : formattedDate.getUTCMonth() + 1,
      formattedDate.getUTCFullYear(),
    ].join("-"),
    [
      formattedDate.getHours() < 10
        ? `0${formattedDate.getHours()}`
        : formattedDate.getHours(),
      formattedDate.getMinutes() < 10
        ? `0${formattedDate.getMinutes()}`
        : formattedDate.getMinutes(),
    ].join(":"),
  ].join(" ");

  return formattedDate;
};

export const getCreateSignalPayloadObj = (values) => {
  const signalDate = dateConversion(values?.signaldate?._d);
  return {
    channelId: values.channel.id,
    // leverage: values.leverage,
    coinId: values.coin.id,
    exchange: values.coin.exchange,
    signalDate: signalDate,
    buyPrice: values.buyprice,
    active: true,
    signalTargetDetails: values.targetDetails.map((targets) => ({
      targetType: targets.targetType.name,
      targetValue: targets.targetValue,
      percentage: "0.0",
      reached: null,
      reachedTime: null,
      active: true,
      targetMode: "CHANNEL_TARGET",
    })),
    coinDetail: { ...values.coin },
  };
};

export const getUpdateSignalPayloadObj = (values, signalData) => {
  const signaldate =
    values.signaldate === signalData?.signalDate
      ? values.signaldate
      : dateConversion(values.signaldate?._d);

  let updateTargetValues = [];
  if (signalData && signalData.channel) {
    let changedChannelTargetArray = values.targetDetails;
    let unchangedChanneltargetArray = signalData.signalTargetDetails.filter(
      (x) => x.targetMode === "CHANNEL_TARGET"
    );
    let targetWithIds = [];
    let targetWithoutIds = [];
    let deletedTargets = [];

    for (let i = 0; i < changedChannelTargetArray.length; i++) {
      if (changedChannelTargetArray[i].id !== undefined)
        targetWithIds.push(changedChannelTargetArray[i]);
      else
        targetWithoutIds.push({
          ...changedChannelTargetArray[i],
          percentage: "0.0",
          reached: null,
          reachedTime: null,
          active: true,
          targetMode: "CHANNEL_TARGET",
        });
    }

    for (let i = 0; i < unchangedChanneltargetArray.length; i++) {
      if (
        !targetWithIds.find((x) => x.id === unchangedChanneltargetArray[i].id)
      )
        deletedTargets.push({
          ...unchangedChanneltargetArray[i],
          active: false,
        });
    }
    updateTargetValues = [
      ...targetWithIds,
      ...targetWithoutIds,
      ...deletedTargets,
    ];
  }

  return {
    ...signalData,
    channelId: values.channel.id,
    coinId: values.coin.id,
    exchange: values.coin.exchange,
    signalDate: signaldate,
    buyPrice: values.buyPrice,
    active: true,
    signalTargetDetails: [...updateTargetValues],
    coinDetail: { ...values.coin },
  };
};
