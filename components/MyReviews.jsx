import { useMutation, useQuery } from '@apollo/client';
import { DELETE_REVIEW, IS_ME } from '../graphQL/queries';
import { Alert, View } from 'react-native';
import ReviewItem from './ReviewItem';
import { format } from 'date-fns';

function MyReviews() {
  const { data } = useQuery(IS_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      // setError(messages);
      console.log('messages', messages);
    },
    refetchQueries: [{ query: IS_ME, variables: { includeReviews: true } }],
  });

  const reviews = data?.me?.reviews?.edges?.map((v) => {
    const { node } = v;
    return {
      ...node,
      createdAt: format(node?.createdAt, 'MM/dd/yyyy'),
    };
  });

  const onAlert = (deleteReviewId) =>
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            deleteReview({ variables: { deleteReviewId } });
          },
        },
      ]
    );

  return (
    <View>
      {reviews?.map((v, i) => {
        return <ReviewItem review={v} key={i} onAlert={onAlert} showBtn />;
      })}
    </View>
  );
}

export default MyReviews;
