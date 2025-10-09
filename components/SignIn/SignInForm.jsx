/* eslint-disable react-native/no-inline-styles */
import Text from '../styleComponent/Text';
import { useFormik } from 'formik';
import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import * as yup from 'yup';
import theme from '../styleComponent/theme';

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: 'red',
  },
  inputText: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    color: `${theme.colors.textSecondary}`,
    padding: 10,
    width: '70%',
  },
  signInBtn: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: '#fff',
    display: 'flex',
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

const initialValues = {
  userName: '',
  pwd: '',
};

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(5, 'userName must be longer then 5 characters')
    .required('userName is required'),
  pwd: yup
    .string()
    .min(4, 'password must be longer then 4 characters')
    .required('password is required'),
});

const SignInForm = (props) => {
  const onSubmit = async (values) => {
    formik.setTouched({
      userName: true,
      pwd: true,
    });
    const { userName, pwd } = values;
    props?.onSubmit({ username: userName, password: pwd });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.signInWrap}>
      <TextInput
        placeholder='User Name'
        value={formik.values.userName}
        onChangeText={formik.handleChange('userName')}
        onBlur={formik.handleBlur('userName')}
        style={[
          styles.inputText,
          formik.touched.userName && formik.errors.userName
            ? styles.errorBorder
            : null,
        ]}
      />
      {formik.touched.userName && formik.errors.userName && (
        <Text style={{ color: 'red' }}>{formik.errors.userName}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.pwd}
        onChangeText={formik.handleChange('pwd')}
        secureTextEntry
        onBlur={formik.handleBlur('pwd')}
        style={[
          styles.inputText,
          formik.touched.pwd && formik.errors.pwd ? styles.errorBorder : null,
        ]}
      />
      {formik.touched.pwd && formik.errors.pwd && (
        <Text style={{ color: 'red' }}>{formik.errors.pwd}</Text>
      )}
      <Pressable
        onPress={() => {
          formik.setTouched({ userName: true, pwd: true });
          formik.handleSubmit();
        }}
        style={styles.signInBtn}
      >
        <Text style={styles.signInText} fontWeights={'bold'}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
