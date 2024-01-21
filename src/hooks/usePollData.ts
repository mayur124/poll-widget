import type { TOption, TPollConfig } from "../types/configuration";

import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const usePollData = (pollConfig: TPollConfig, uniqueId: string) => {
  const { getDataFromLocalStorage, setDataInLocalStorage } = useLocalStorage();
  const [pollData, setPollData] = useState(
    () => getDataFromLocalStorage<TPollConfig>(`${uniqueId}-${pollConfig.id}`) || pollConfig
  );

  const handleFormSubmit = (optionId: TOption["id"]) => {
    // keeping selection state to show the selected option untill page is not refreshed
    const modifiedPollData = {
      ...pollData,
      totalVotes: pollData.totalVotes + 1,
      options: pollData.options.map((option) => {
        if (optionId === option.id) {
          option.voteCount++;
          option.isSelected = true;
        }
        return option;
      }),
    };
    // reseting selction state while storing in localstorage to show the fresh view when page is reloaded
    setDataInLocalStorage(
      `${uniqueId}-${pollData.id}`,
      JSON.stringify({
        ...modifiedPollData,
        options: modifiedPollData.options.map((option) => {
          const optionCopy = { ...option };
          optionCopy.isSelected = false;
          return optionCopy;
        }),
      })
    );
    setPollData(modifiedPollData);
  };

  return { pollData, handleFormSubmit };
};
