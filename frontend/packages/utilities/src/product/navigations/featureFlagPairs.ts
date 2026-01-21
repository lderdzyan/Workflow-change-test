import { MicroAppsBases } from "../../shared/location/microAppsBases";

export const getFeatureFlagPairs = (): Array<[boolean | undefined, MicroAppsBases]> => [
  [window?.MS_MIRROR_REFLECTIONS_ENABLED, MicroAppsBases.MIRROR_REFLECTIONS],
  [window?.MS_INDICATOR_ENABLED, MicroAppsBases.INDICATOR],
  [window?.MS_BUILDER_ENABLED, MicroAppsBases.BUILDER],
];

