import { Action, ActionPanel, getPreferenceValues, Icon, List } from "@raycast/api";
import { parseEntityRef } from "@backstage/catalog-model";
import { SearchQueryResultSoftwareCatalog } from "../lib/schema";

const preferences = getPreferenceValues();

export type SoftwareCatalogItemProps = {
  item: SearchQueryResultSoftwareCatalog;
};

export function SoftwareCatalogItem(props: SoftwareCatalogItemProps) {
  const { kind, owner, location, text, title } = props.item.document;
  let icon = Icon.QuestionMark;
  switch (kind) {
    case "component":
      icon = Icon.ComputerChip;
      break;
    case "api":
      icon = Icon.Patch;
      break;
    case "user":
      icon = Icon.Person;
      break;
    case "group":
      icon = Icon.TwoPeople;
      break;
  }

  const parsedOwner = owner ? parseEntityRef(owner) : undefined;

  return (
    <List.Item
      key={`softwarecatalog-${location}-${kind}-${title}`}
      title={title}
      subtitle={text}
      accessories={[
        {
          icon,
          text: kind,
        },
      ]}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open in Backstage" url={`${preferences.backstageUrl}${location}`} />
          {parsedOwner && (
            <Action.OpenInBrowser
              title="Show Owner in Backstage"
              url={`${preferences.backstageUrl}/catalog/${parsedOwner.namespace}/${parsedOwner.kind}/${parsedOwner.name}`}
            />
          )}
        </ActionPanel>
      }
    />
  );
}
