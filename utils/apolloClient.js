import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// @ts-ignore
import { GRAPHQL_URL } from '@env';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${GRAPHQL_URL}/graphql`,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
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
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
