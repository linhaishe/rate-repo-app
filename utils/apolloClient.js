import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// @ts-ignore
import { GRAPHQL_URL } from '@env';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: `${GRAPHQL_URL}/graphql`,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const token = accessToken?.accessToken ?? '';

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${token}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
