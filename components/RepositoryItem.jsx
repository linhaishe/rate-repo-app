import { View, Image, StyleSheet } from 'react-native';
import Text from './styleComponent/Text';
import theme from './styleComponent/theme';
import CountList from './CountList';

const styles = StyleSheet.create({
  cardWrap: {
    backgroundColor: '#fff',
    marginBottom: 5,
    padding: 20,
    width: '100%',
  },
  detailWrap: {
    display: 'flex',
    flex: 1,
    gap: 8,
    justifyContent: 'flex-start',
    marginLeft: 30,
  },
  imgWrap: {
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },

  typeWrap: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    color: '#fff',
    padding: 6,
    width: 'max-content',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.cardWrap}>
      <View style={styles.infoWrap}>
        <Image style={styles.imgWrap} source={item.ownerAvatarUrl} />
        <View style={styles.detailWrap}>
          <Text fontWeight={'bold'}>{item.fullName}</Text>
          <Text color={'textSecondary'}>{item.description}</Text>
          <Text style={styles.typeWrap}>{item.language}</Text>
        </View>
      </View>
      <CountList item={item} />
    </View>
  );
};

export default RepositoryItem;
