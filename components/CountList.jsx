import { View, StyleSheet } from 'react-native';
import Text from './styleComponent/Text';

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

const formatCount = (value, k = 1000) => {
  if (value < k) return String(value);
  const formatted = (value / k).toFixed(1);
  return formatted.endsWith('.0')
    ? `${formatted.slice(0, -2)}k`
    : `${formatted}k`;
};

const formatRepositoryStats = (repo) => [
  { name: 'Stars', value: repo.stargazersCount },
  { name: 'Forks', value: repo.forksCount },
  { name: 'Reviews', value: repo.reviewCount },
  { name: 'Rating', value: repo.ratingAverage },
];

const CountList = ({ item }) => {
  const statusDataList = formatRepositoryStats(item);

  return (
    <View style={styles.listWrap}>
      {statusDataList?.map((item, index) => (
        <View key={index} style={styles.itemWrap}>
          <Text fontWeight={'bold'}>{formatCount(item.value)}</Text>
          <Text color={'textSecondary'}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CountList;
