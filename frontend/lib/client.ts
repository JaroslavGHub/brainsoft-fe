import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  process.env.PUBLIC_URL_SERVER_GRAPHQL ?? ""
);
