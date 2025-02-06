import { getPreferenceValues, List, showHUD } from "@raycast/api";
import { SearchType } from "../lib/types";
import { SearchQueryResponse } from "../lib/schema";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { getAccessToken, usePromise } from "@raycast/utils";
import { SoftwareCatalogItem } from "./SoftwareCatalogItem";
import { TechDocsItem } from "./TechDocsItem";
import { client, provider } from "../lib/auth";

const preferences = getPreferenceValues();
export type BaseSearchProps = {
  type: SearchType;
};

export function BaseSearch({ type }: BaseSearchProps) {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = usePromise(fetchBackstage, [searchText, type]);
  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} throttle>
      <List.Section title="Components">
        {data?.results.map((svc) => {
          if (svc.type === "unknown") {
            console.log("Unknown result", svc);
            return null;
          }
          if (svc.type === "software-catalog") {
            return <SoftwareCatalogItem item={svc} />;
          }
          if (svc.type === "techdocs") {
            return <TechDocsItem item={svc} />;
          }

          return null;
        })}
      </List.Section>
    </List>
  );
}

async function fetchBackstage(query: string, searchType: SearchType): Promise<SearchQueryResponse> {
  const { token } = getAccessToken();
  console.log("Token", token);

  const params = new URLSearchParams();
  if (query) {
    params.append("term", query);
  }
  if (searchType !== "all") {
    params.append("types[0]", searchType);
  }

  const queryURL = `${preferences.backstageUrl}/api/search/query?${params.toString()}`;
  const queryInit: fetch.RequestInit = {};
  if (token) {
    queryInit["headers"] = {
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await fetch(queryURL, queryInit);

  // if (res.status === 401) {
  //   const newToken = await provider.authorize();
  //
  //   console.log(`Token identical ${newToken === token}`);
  //   await showHUD(`Your session has expired. Please re-authenticate. New token ${newToken}`);
  //   res = await fetch(queryURL, {
  //     headers: {
  //       Authorization: `Bearer ${newToken}`,
  //     },
  //   })
  // }

  if (!res.ok) {
    console.log("Failed to fetch Backstage", res.status);
    throw new Error(`Failed to fetch Backstage. ${res.status}: ${await res.text()}`);
  }

  const body = await res.json();
  return SearchQueryResponse.parse(body);
}
