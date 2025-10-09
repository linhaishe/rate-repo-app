import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { ALL_REPOSITORIES } from '../graphQL/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // const { repositories } = useRepositories();
  const { data } = useQuery(ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  const repositoryNodes = data?.repositories
    ? data?.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
