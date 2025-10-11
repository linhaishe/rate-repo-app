import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAIL } from '../graphQL/queries';
import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import ReviewItem from './ReviewItem';

function RepoDetail() {
  const { id } = useParams();
  const { data } = useQuery(GET_REPO_DETAIL, {
    variables: { repositoryId: id },
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

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data?.repository} />}
    />
  );
}

export default RepoDetail;
