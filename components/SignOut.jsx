import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { Pressable } from 'react-native';
import Text from './styleComponent/Text';

const SignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore(); // 会重新执行 IS_ME 这类 active query
    } catch (e) {
      console.log('Sign out failed', e);
    }
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Text style={{ color: '#fff' }}>Sign Out</Text>
    </Pressable>
  );
};

export default SignOut;
