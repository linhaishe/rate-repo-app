/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './styleComponent/Text';
import { Link } from 'react-router-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  navLinkWrap: {
    alignItems: 'center',
    backgroundColor: '#24292e',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    height: 30,
    justifyContent: 'center',
    width: '100%',
    // border: '1px solid red',
    // flex: 1,
  },
});

const AppBar = () => {
  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.container} edges={['top']}>
    //     <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.navLinkWrap}>
      <Link to={'/'}>
        <Text style={{ color: '#fff' }} fontWeights={'bold'}>
          Repository
        </Text>
      </Link>
      <Link to={'/signin'}>
        <Text style={{ color: '#fff' }} fontWeights={'bold'}>
          SignIn
        </Text>
      </Link>
    </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default AppBar;
