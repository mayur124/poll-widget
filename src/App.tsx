import type { FC } from "react";
import type { TPollConfig } from "./types/configuration";

import { getFormattedDate } from "./helpers";

import { useState } from "react";
import { usePollData } from "./hooks/usePollData";

import { PollOption } from "./components";

type TProps = {
  uniqueId: string;
  pollConfig: TPollConfig;
};

const App: FC<TProps> = (props) => {
  const { pollData, handleFormSubmit } = usePollData(
    props.pollConfig,
    props.uniqueId
  );

  const [disableSelection, setDisableSelection] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold">{pollData.question}</h1>
      <p className="text-sm mt-3 text-gray-500">
        Created at:{" "}
        <strong className="text-gray-600">
          {getFormattedDate(pollData.createdTimestamp)}
        </strong>
      </p>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          setDisableSelection(true);
        }}
      >
        <div>
          {pollData.options.map((option) => (
            <PollOption
              key={option.id}
              option={option}
              totalVotes={pollData.totalVotes}
              disableSelection={disableSelection}
              onClick={handleFormSubmit}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-xl text-gray-600">
          Total Votes:{" "}
          <strong className="text-black">{pollData.totalVotes}</strong>
        </p>
      </form>
    </div>
  );
};

export default App;
