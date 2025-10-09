import { StyleSheet, View } from 'react-native';
import useSignIn from '../../hooks/useSignIn';
import UserProfile from './UserProfile';
import SignInForm from './SignInForm';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    gap: 30,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    width: '100%',
  },
});

const SignIn = () => {
  const { signIn, setIsLoggedIn, isLoggedIn, userData } = useSignIn();
  const onSubmit = async (signInValue) => {
    try {
      await signIn(signInValue);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const renderContent = () => {
    if (isLoggedIn === null) return null;

    return isLoggedIn ? (
      <UserProfile userData={userData} />
    ) : (
      <SignInForm onSubmit={onSubmit} />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

export default SignIn;
