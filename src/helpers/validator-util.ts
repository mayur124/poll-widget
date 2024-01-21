import type { TConfigurations } from "../types/configuration";

export function isValidConfig(config: TConfigurations) {
  if (
    config.id == null ||
    config.question == null ||
    config.totalVotes == null ||
    config.createdTimestamp == null ||
    config.options == null ||
    !Array.isArray(config.options) ||
    config.options.length === 0
  ) {
    return false;
  }
  return true;
}

export function isWidgetAlreadyLoaded(configId: TConfigurations["id"]) {
  return window[`loaded-${configId}`];
}
