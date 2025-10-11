import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAIL } from '../graphQL/queries';
import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import ReviewItem from './ReviewItem';

function RepoDetail() {
  const { id } = useParams();
  const { data, fetchMore, loading } = useQuery(GET_REPO_DETAIL, {
    variables: { repositoryId: id, first: 4 },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.repository?.reviews?.edges?.map((v) => {
    const { node } = v;
    return {
      ...node,
      createdAt: format(node?.createdAt, 'MM/dd/yyyy'),
    };
  });

  function onEndReach() {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    console.log('review list on end');
    fetchMore({
      variables: {
        after: data?.repository?.reviews?.pageInfo?.endCursor,
        repositoryId: id,
      },
    });
  }

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data?.repository} />}
    />
  );
}

export default RepoDetail;
