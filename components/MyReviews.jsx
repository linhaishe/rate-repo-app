import { useQuery } from '@apollo/client';
import { IS_ME } from '../graphQL/queries';
import { Alert, View } from 'react-native';
import ReviewItem from './ReviewItem';
import { format } from 'date-fns';

function MyReviews() {
  const { data } = useQuery(IS_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.me?.reviews?.edges?.map((v) => {
    const { node } = v;
    return {
      ...node,
      createdAt: format(node?.createdAt, 'MM/dd/yyyy'),
    };
  });

  const onAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <View>
      {reviews?.map((v, i) => {
        return <ReviewItem review={v} key={i} onAlert={onAlert} />;
      })}
    </View>
  );
}

export default MyReviews;
