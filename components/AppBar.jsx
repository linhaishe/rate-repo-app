import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './styleComponent/Text';
import { Link } from 'react-router-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView horizontal>
          <View style={styles.bgColor}>
            {/* <Pressable onPress={() => console.log(' we are press')}> */}
            <Link to={'/'}>
              <Text color={'primary'}>Repository</Text>
            </Link>
            {/* </Pressable> */}
            <Link to={'/signin'}>
              <Text color={'primary'}>SignIn</Text>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppBar;
