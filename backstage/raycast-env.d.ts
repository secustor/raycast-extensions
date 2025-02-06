/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Backstage URL - Backstage URL */
  "backstageUrl": string,
  /** Backstage API Token - Set a static token for the Backstage API */
  "apiToken"?: string,
  /** Provider - Pick a provider */
  "provider": "none" | "okta",
  /** Application Client ID - Application Client ID of one of the oauth app used by Backstage */
  "appID"?: string,
  /** OAuth Domain - OAuth Domain of the oauth app used by Backstage */
  "oAuthDomain"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search` command */
  export type Search = ExtensionPreferences & {}
  /** Preferences accessible in the `search-catalog` command */
  export type SearchCatalog = ExtensionPreferences & {}
  /** Preferences accessible in the `search-techdocs` command */
  export type SearchTechdocs = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search` command */
  export type Search = {}
  /** Arguments passed to the `search-catalog` command */
  export type SearchCatalog = {}
  /** Arguments passed to the `search-techdocs` command */
  export type SearchTechdocs = {}
}

