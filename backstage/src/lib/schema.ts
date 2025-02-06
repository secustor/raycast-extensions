import z from "zod";

const SearchQueryBaseDocument = z.object({
  title: z.string(),
  text: z.string(),
  location: z.string(),
});

const SearchQueryResultSoftwareCatalog = z.object({
  type: z.literal("software-catalog"),
  rank: z.number(),
  document: SearchQueryBaseDocument.extend({
    kind: z.string().describe("The kind of the entity. component").toLowerCase(),
    type: z.string(),
    owner: z.string().describe("The entity ref to the owner of the entity. group:default/a-group").optional(),
  }),
});
export type SearchQueryResultSoftwareCatalog = z.infer<typeof SearchQueryResultSoftwareCatalog>;

const SearchQueryResultDocs = z.object({
  type: z.literal("techdocs"),
  rank: z.number(),
  document: SearchQueryBaseDocument.extend({
    kind: z.string().describe("The kind of the entity. component").toLowerCase(),
    type: z.string(),
    owner: z.string().describe("The entity ref to the owner of the entity. group:default/a-group"),
  }),
});
export type SearchQueryResultDocs = z.infer<typeof SearchQueryResultDocs>;

const SearchQueryResultUnknown = z.object({
  type: z.literal("unknown"),
  error: z.any(),
});

export const SearchQueryResult = z
  .discriminatedUnion("type", [SearchQueryResultSoftwareCatalog, SearchQueryResultDocs, SearchQueryResultUnknown])
  .catch((result) => {
    return {
      type: "unknown",
      error: result.error,
    };
  });
export type SearchQueryResult = z.infer<typeof SearchQueryResult>;

export const SearchQueryResponse = z.object({
  nextPageCursor: z.string().optional(),
  results: z.array(SearchQueryResult),
});

export type SearchQueryResponse = z.infer<typeof SearchQueryResponse>;
