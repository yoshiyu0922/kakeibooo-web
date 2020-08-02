import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

class GraphQLClient {
  private apollo: ApolloClient<NormalizedCacheObject>;

  constructor({ url }: { url: string }) {
    this.apollo = new ApolloClient({
      uri: url,
      cache: new InMemoryCache(),
    });
  }

  public query(query: any, { variables }: { variables?: any } = {}) {
    return this.apollo.query({ query, variables });
  }

  public mutation(mutation: any, { variables }: { variables?: any } = {}) {
    return this.apollo.mutate({ mutation, variables });
  }
}

export default GraphQLClient;
