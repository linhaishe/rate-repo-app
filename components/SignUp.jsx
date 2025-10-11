/* eslint-disable react-native/no-inline-styles */
import Text from './styleComponent/Text';
import { useFormik } from 'formik';
import { View, TextInput, StyleSheet } from 'react-native';
import * as yup from 'yup';
import theme from './styleComponent/theme';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphQL/queries';
import { Button } from './Button';

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
  signUpWrap: {
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
  pwdConfirm: '',
};

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(5, 'userName must be longer then 5 characters')
    .max(30, 'userName must be less then 30 characters')
    .required('userName is required'),
  pwd: yup
    .string()
    .min(5, 'password must be longer then 5 characters')
    .max(30, 'password must be less then 30 characters')
    .required('password is required'),
  pwdConfirm: yup
    .string()
    .oneOf([yup.ref('pwd'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const SignUp = (props) => {
  let navigate = useNavigate();
  const [error, setError] = useState('');

  const onSignIn = async ({ username, password }) => {
    try {
      await props?.signIn({ username, password });
      props?.setIsLoggedIn(true);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      const messages =
        error.graphQLErrors.map((e) => e.message).join('\n') || error.message;
      setError(messages);
    },
  });
  const onSubmit = async (values) => {
    formik.setTouched({
      userName: true,
      pwd: true,
      pwdConfirm: true,
    });
    const { userName, pwd } = values;

    try {
      const { data } = await createUser({
        variables: { user: { username: userName, password: pwd } },
      });

      if (data?.createUser) {
        // 注册成功后自动登录
        await onSignIn({ username: userName, password: pwd });
      }
    } catch (e) {
      console.error('singup fail', e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.signUpWrap}>
      {/* {error && <Text style={{ color: 'red' }}>{error}</Text>} */}
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
      <TextInput
        placeholder='Password confirmation'
        value={formik.values.pwdConfirm}
        onChangeText={formik.handleChange('pwdConfirm')}
        secureTextEntry
        onBlur={formik.handleBlur('pwdConfirm')}
        style={[
          styles.inputText,
          formik.touched.pwdConfirm && formik.errors.pwdConfirm
            ? styles.errorBorder
            : null,
        ]}
      />
      {formik.touched.pwdConfirm && formik.errors.pwdConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.pwdConfirm}</Text>
      )}
      <Button
        onPress={() => {
          formik.setTouched({
            userName: true,
            pwd: true,
            pwdConfirm: true,
          });
          formik.handleSubmit();
        }}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default SignUp;
