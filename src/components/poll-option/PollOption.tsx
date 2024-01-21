import type { FC } from "react";
import type { TProps } from "./poll-option.type";

export const PollOption: FC<TProps> = (props) => {
  const { onClick, option, totalVotes, disableSelection } = props;
  // prettier-ignore
  // zero divided by zero is NaN and any other number divided by zero is Infinity
  const percentageValue = totalVotes === 0 ? 0 : parseFloat(`${(option.voteCount / totalVotes) * 100}`).toFixed(2);

  return (
    <button
      disabled={disableSelection}
      onClick={() => {
        if (disableSelection) return;
        onClick(option.id);
      }}
      className={`
        flex flex-col gap-2 my-5 p-4 w-full text-lg font-medium border-2 shadow-md rounded-md transition-all duration-300 
        ${
          option.isSelected
            ? "border-green-400 shadow-green-100 !opacity-100"
            : "border-gray-100 shadow-gray-100"
        }
        ${
          disableSelection
            ? "cursor-not-allowed opacity-50"
            : "outline-green-400 hover:border-green-400"
        }`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap w-full">
        <span title={option.label}>{option.label}</span>
        <span className="shrink-0">{percentageValue}%</span>
      </div>
      <div
        className={`overflow-hidden h-2 border border-gray-200 rounded-md w-full ${
          option.isSelected ? "text-green-400" : "text-gray-200"
        }`}
      >
        <span
          className="block transition-transform origin-left h-full bg-current rounded-md"
          style={{
            transform: `scaleX(${percentageValue}%)`,
          }}
        />
      </div>
      <p className="text-gray-400 font-medium text-xs">
        {option.voteCount} {option.voteCount > 1 ? "Votes" : "Vote"}
      </p>
    </button>
  );
};
