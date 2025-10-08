import Text from './styleComponent/Text';
import { useFormik } from 'formik';
import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import theme from './styleComponent/theme';
const initialValues = {
  userName: '',
  pwd: '',
};

const styles = StyleSheet.create({
  inputText: {
    border: `1px solid ${theme.colors.textSecondary}`,
    borderRadius: 5,
    color: `${theme.colors.textSecondary}`,
    height: '40',
    margin: '0 auto',
    padding: 10,
    width: '70%',
  },
  signInBtn: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: '#fff',
    display: 'flex',
    height: '40',
    justifyContent: 'center',
    padding: 10,
    width: '70%',
  },
  signInText: {
    color: '#fff',
  },
  signInWrap: {
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
  const onSubmit = (values) => {
    console.log('submit:', values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.signInWrap}>
      <TextInput
        placeholder='User Name'
        value={formik.values.userName}
        onChangeText={formik.handleChange('userName')}
        style={styles.inputText}
      />
      <TextInput
        placeholder='Password'
        value={formik.values.pwd}
        onChangeText={formik.handleChange('pwd')}
        secureTextEntry
        style={styles.inputText}
      />
      <View style={styles.signInBtn}>
        <Pressable onPress={formik.handleSubmit}>
          <Text style={styles.signInText} fontWeights={'bold'}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
