import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Text from './styleComponent/Text';
import theme from './styleComponent/theme';
import { Button } from './Button';
import * as Linking from 'expo-linking';
// 1. add btn  - goto repo / delete
// alert
// refetch

const styles = StyleSheet.create({
  MyReviewWrap: {
    marginBottom: 5,
  },
  reviewWrap: {
    width: '100%',
    padding: 20,
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
  btnWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
});

const ReviewItem = ({ review, onAlert }) => {
  return (
    <View style={styles.MyReviewWrap}>
      <View style={styles.reviewWrap}>
        <View style={styles.scoreWrap}>
          <View style={styles.scoreTextWrap}>
            <Text
              color={'primary'}
              fontWeight={'bold'}
              style={styles.scoreText}
            >
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
      <View style={styles.btnWrap}>
        <Button
          onPress={() => {
            Linking.openURL(review?.repository?.url);
          }}
        >
          View Repo
        </Button>
        <Button
          onPress={() => {
            onAlert();
            console.log(1323);
            // () => Alert.alert('Test', 'Hello');
          }}
          buttonStyles={{ backgroundColor: 'red' }}
        >
          Delete review
        </Button>
      </View>
    </View>
  );
};

export default ReviewItem;
