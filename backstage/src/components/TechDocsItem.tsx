import { Action, ActionPanel, getPreferenceValues, Icon, List } from "@raycast/api";
import { SearchQueryResultDocs } from "../lib/schema";

const preferences = getPreferenceValues();

interface TechDocsItemProps {
  item: SearchQueryResultDocs;
}

export function TechDocsItem(props: TechDocsItemProps) {
  const { location, title, text, owner, kind } = props.item.document;
  return (
    <List.Item
      key={`techdocs-${location}-${kind}-${title}`}
      title={title}
      subtitle={text}
      accessories={[
        {
          icon: Icon.Document,
          text: owner,
        },
      ]}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open in Backstage" url={`${preferences.backstageUrl}${location}`} />
        </ActionPanel>
      }
    />
  );
}
