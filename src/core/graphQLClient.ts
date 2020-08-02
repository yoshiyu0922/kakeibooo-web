import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

class GraphQLClient {
  private apollo: ApolloClient<NormalizedCacheObject>;

  constructor({ url, token }: { url: string; token: string | null }) {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    this.apollo = new ApolloClient({
      link: authLink.concat(createHttpLink({ uri: url })),
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
