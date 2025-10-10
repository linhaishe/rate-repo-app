import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAIL } from '../graphQL/queries';
import { FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Text from './styleComponent/Text';
import theme from './styleComponent/theme';

const styles = StyleSheet.create({
  reviewWrap: {
    width: '100%',
    padding: 20,
    marginBottom: 5,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scoreWrap: {
    width: 50,
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  scoreTextWrap: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: theme?.colors?.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: theme?.colors?.primary,
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  comment: {
    flex: 1,
    paddingLeft: 20,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewWrap}>
      <View style={styles.scoreWrap}>
        <View style={styles.scoreTextWrap}>
          <Text color={'primary'} fontWeight={'bold'} style={styles.scoreText}>
            95
          </Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Text fontWeight={'bold'}>kalle</Text>
        <Text
          color={'textSecondary'}
          style={{
            marginTop: 5,
          }}
        >
          05.05.2020
        </Text>
        <Text
          style={{
            marginTop: 10,
          }}
        >
          Review's text field contains the textual review, rating field a
          numeric rating between 0 and 100, and createdAt the date when the
          review was created. Review's user field contains the reviewer's
          information, which is of type User.
        </Text>
      </View>
    </View>
  );
};

function RepoDetail() {
  const { id } = useParams();
  const { data } = useQuery(GET_REPO_DETAIL, {
    variables: { repositoryId: id },
    skip: !id,
  });
  const [reviews, setReviews] = useState([
    {
      id,
      content: '1111',
    },
  ]);

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
