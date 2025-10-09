/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './styleComponent/Text';
import { Link } from 'react-router-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { IS_ME } from '../graphQL/queries';
import { useQuery } from '@apollo/client';
import SignOut from './SignOut';
import { useEffect } from 'react';

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
  },
});

const AppBar = () => {
  const { data } = useQuery(IS_ME, {
    fetchPolicy: 'cache-and-network',
  });

  console.log('data', data);
  const signInRender = () => {
    // if (data?.me?.id === undefined) {
    //   return null;
    // }

    if (data?.me?.id) {
      return <SignOut />;
    }

    return (
      <Link to={'/signin'}>
        <Text style={{ color: '#fff' }} fontWeights={'bold'}>
          SignIn
        </Text>
      </Link>
    );
  };

  useEffect(() => {
    console.log('IS_ME query executed, data:', data);
  }, [data]);

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
      {signInRender()}
    </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default AppBar;
