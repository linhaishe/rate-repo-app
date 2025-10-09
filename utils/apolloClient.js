import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL } from '@env';

const createApolloClient = () => {
  //   return new ApolloClient({
  //     uri: `${GRAPHQL_URL}/graphql`,
  //     cache: new InMemoryCache(),
  //   });
};

export default createApolloClient;
