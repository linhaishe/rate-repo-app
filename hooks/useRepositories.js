import { useState, useEffect, useMemo } from 'react';
// import { API_URL } from '@env';
import { useQuery } from '@apollo/client';
import { REPO_ORDERBY } from '../graphQL/queries';
import { useDebounce } from 'use-debounce';

const useRepositories = (params) => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  // const fetchRepositories = async (params) => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch(`${API_URL}/api/repositories`);
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

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

  const { data, fetchMore, loading } = useQuery(REPO_ORDERBY, {
    variables: {
      ...params,
      ...variables,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repositories?.pageInfo.endCursor,
        ...variables,
        ...params,
      },
    });
  };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  return {
    repositories: data?.repositories,
    loading,
    // refetch: fetchRepositories,
    fetchMore: handleFetchMore,
    setSelectedValue,
    setSearchQuery,
    debouncedSearch,
    searchQuery,
  };
};

export default useRepositories;
