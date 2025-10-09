import { ApolloClient, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
import { GRAPHQL_URL } from '@env';

const createApolloClient = () => {
  return new ApolloClient({
    uri: `${GRAPHQL_URL}/graphql`,
    cache: new InMemoryCache(),
    fetch,
  });
};

export default createApolloClient;
