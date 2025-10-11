import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { REPO_ORDERBY } from '../graphQL/queries';
import { useEffect, useMemo, useState } from 'react';
import RepositoryListHeader from './SortAndSearch';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // const { repositories } = useRepositories();
  const [selectedValue, setSelectedValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const variables = useMemo(() => {
    const base = (() => {
      switch (Number(selectedValue)) {
        case 1:
          return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
        case 2:
          return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
        default:
          return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      }
    })();

    return {
      ...base,
      searchKeyword: debouncedSearch || undefined,
    };
  }, [selectedValue, debouncedSearch]);

  const { data } = useQuery(REPO_ORDERBY, {
    variables,
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
