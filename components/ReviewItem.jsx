import React from 'react';
import { View, StyleSheet } from 'react-native';
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
            {review?.rating}
          </Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Text fontWeight={'bold'}>{review?.user?.username}</Text>
        <Text
          color={'textSecondary'}
          style={{
            marginTop: 5,
          }}
        >
          {review?.createdAt}
        </Text>
        <Text
          style={{
            marginTop: 10,
          }}
        >
          {review?.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;
