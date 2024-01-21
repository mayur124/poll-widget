import type { TPollConfig, TOption } from "../../types/configuration";

// prettier-ignore
export type TProps = 
  & Pick<TPollConfig, "totalVotes">
  & {
    option: TOption;
    disableSelection: boolean;
    onClick: (optionId: TOption["id"]) => void;
  };
