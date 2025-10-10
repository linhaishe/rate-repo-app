import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './styleComponent/Text';
import theme from './styleComponent/theme';
import CountList from './CountList';
import { useNavigate, useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

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
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    color: '#fff',
    maxWidth: 200,
    padding: 6,
  },

  openGithubBtn: {
    backgroundColor: theme.colors.primary,
    color: '#fff',
    width: '100%',
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item }) => {
  let navigate = useNavigate();
  const { id } = useParams();

  return (
    <Pressable
      onPress={() => {
        if (id) {
          return;
        }

        navigate(`/repo-detail/${item?.id}`);
      }}
    >
      <View style={styles.cardWrap} testID='repositoryItem'>
        <View style={styles.infoWrap}>
          <Image
            style={styles.imgWrap}
            source={{ uri: item?.ownerAvatarUrl }}
          />
          <View style={styles.detailWrap}>
            <Text fontWeight={'bold'}>{item?.fullName}</Text>
            <Text color={'textSecondary'}>{item?.description}</Text>
            <Text style={styles.typeWrap}>{item?.language}</Text>
          </View>
        </View>
        <CountList item={item} />
        {id && (
          <Pressable
            onPress={() => {
              Linking.openURL(item?.url);
            }}
            style={styles.openGithubBtn}
          >
            <Text style={{ color: '#fff' }}>Open in Github</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
