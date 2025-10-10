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

const SignIn = (props) => {
  const onSubmit = async (signInValue) => {
    try {
      await props?.signIn(signInValue);
      props?.setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const renderContent = () => {
    if (props?.isLoggedIn === null) return null;

    return props?.isLoggedIn ? (
      <UserProfile userData={props?.userData} />
    ) : (
      <SignInForm onSubmit={onSubmit} />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

export default SignIn;
