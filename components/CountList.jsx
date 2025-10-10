import { View, StyleSheet } from 'react-native';
import Text from './styleComponent/Text';
import { formatCount } from '../utils/formatCount';

const styles = StyleSheet.create({
  itemWrap: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
  },
  listWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const formatRepositoryStats = (repo) => [
  { name: 'Stars', value: repo?.stargazersCount || 0 },
  { name: 'Forks', value: repo?.forksCount || 0 },
  { name: 'Reviews', value: repo?.reviewCount || 0 },
  { name: 'Rating', value: repo?.ratingAverage || 0 },
];

const CountList = ({ item }) => {
  const statusDataList = formatRepositoryStats(item);

  return (
    <View style={styles.listWrap}>
      {statusDataList?.map((item, index) => (
        <View key={index} style={styles.itemWrap}>
          <Text fontWeight={'bold'}>{formatCount(item?.value)}</Text>
          <Text color={'textSecondary'}>{item?.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CountList;
