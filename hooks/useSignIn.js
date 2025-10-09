import { useMutation } from '@apollo/client';
import { USER_AUTH } from '../graphQL/queries';
import { useState, useEffect } from 'react';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
  const authStorage = new AuthStorage('app-user-token');
  // 登录状态： null = 未尝试, false = 登录失败, true = 登录成功
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  const [signInMutate, result] = useMutation(USER_AUTH, {
    onError: (error) => {
      console.log('Login error:', error.graphQLErrors[0]?.message);
      setIsLoggedIn(false);
    },
  });

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await signInMutate({
        variables: { credentials: { username, password } },
      });

      if (data?.authenticate?.accessToken) {
        setIsLoggedIn(true);
        await storeData(data.authenticate);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  };

  const storeData = async (value) => {
    try {
      await authStorage.setAccessToken(value);
      setUserData(value);
    } catch (e) {
      console.log('AsyncStorage error:', e);
    }
  };

  const checkLocalToken = async () => {
    try {
      const token = await authStorage.getAccessToken();
      if (token?.accessToken) {
        setIsLoggedIn(true);
        setUserData(token);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLocalToken();
  }, []);

  return { signIn, result, isLoggedIn, userData, setIsLoggedIn };
};

export default useSignIn;
