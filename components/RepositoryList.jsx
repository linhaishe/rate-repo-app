import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import RepositoryListHeader from './SortAndSearch';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {
    fetchMore,
    selectedValue,
    searchQuery,
    setSearchQuery,
    setSelectedValue,
    repositories,
  } = useRepositories({
    first: 4,
  });

  function onEndReach() {
    console.log('on end');
    fetchMore();
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <RepositoryListHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      }
    />
  );
};

export default RepositoryList;
