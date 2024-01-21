export type TOption = {
  id: string;
  label: string;
  isSelected?: boolean;
  voteCount: number;
};

export type TPollConfig = {
  id: string;
  question: string;
  options: TOption[];
  createdTimestamp: number;
  totalVotes: number;
};

type TWidgetConfig = {
  parentElementId?: string;
};

export type TConfigurations = TWidgetConfig & TPollConfig;
