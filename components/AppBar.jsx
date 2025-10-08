import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './styleComponent/Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#24292e',
  },
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  return (
    <View style={styles.bgColor}>
      {/* <Pressable onPress={() => console.log(' we are press')}> */}
      <Link to={'/'}>
        <Text style={styles.container} color={'primary'}>
          Repository
        </Text>
      </Link>
      {/* </Pressable> */}
      <Link to={'/signin'}>
        <Text style={styles.container} color={'primary'}>
          SignIn
        </Text>
      </Link>
    </View>
  );
};

export default AppBar;
