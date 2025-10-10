import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn/index';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import RepoDetail from './RepoDetail';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const { signIn, setIsLoggedIn, isLoggedIn, userData } = useSignIn();

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route
          path='/signin'
          element={
            <SignIn
              signIn={signIn}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              userData={userData}
            />
          }
        />
        <Route path='/repo-detail/:id' element={<RepoDetail />} />
        <Route path='/create-review' element={<ReviewForm />} />
        <Route
          path='/signUp'
          element={<SignUp signIn={signIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
