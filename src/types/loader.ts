import { TConfigurations } from "./configuration";

/**
 * @description this will hold the configuration until the widget script (`index.ts`) is not loaded
 */
export type TLoader = Record<string, Record<"c", TConfigurations[]>>;
