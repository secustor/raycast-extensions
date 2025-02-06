import { PreferenceValues } from "@raycast/api";

export interface Preferences extends PreferenceValues {
  appID?: string;
  backstageUrl: string;
  apiToken?: string;
  provider?: string;
  oAuthDomain?: string;
}

export type SearchType = "all" | "software-catalog" | "techdocs";
