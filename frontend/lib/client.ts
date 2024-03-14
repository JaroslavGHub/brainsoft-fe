import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.PUBLIC_URL_SERVER_GRAPHQL,
  cache: new InMemoryCache(),
});

export default client;
