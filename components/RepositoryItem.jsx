import { View, Text } from 'react-native';

const RepositoryItem = ({ item }) => {
  console.log('item', item);

  return (
    <View>
      <Text>fullName: {item.fullName}</Text>
      <Text>description: {item.description}</Text>
      <Text>language: {item.language}</Text>
      <Text>forksCount: {item.fullName}</Text>
      <Text>stargazersCount: {item.fullName}</Text>
      <Text>ratingAverage: {item.fullName}</Text>
      <Text>reviewCount: {item.reviewCount}</Text>
    </View>
  );
};

export default RepositoryItem;
