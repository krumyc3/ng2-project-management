import { ApolloClientOptions } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = {
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjb2hxa2p1edf0195t7wi8zwo'
  }),
  cache: InMemoryCache
};

export {
  client
};
