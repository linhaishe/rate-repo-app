import { useMutation } from '@apollo/client';
import Text from './styleComponent/Text';
import theme from './styleComponent/theme';
import { useFormik } from 'formik';
import { View, TextInput, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { ADD_REVIEW } from '../graphQL/queries';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
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
  repoOwnerName: '',
  repoName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repoOwnerName: yup.string().required('repoOwnerName is required'),
  repoName: yup.string().required('repoName is required'),
  rating: yup
    .number()
    .integer()
    .min(0, 'Rating is a required number between 0 and 100')
    .max(100, 'Rating is a required number between 0 and 100')
    .required('rating is required'),
});

const ReviewForm = (props) => {
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [createReview] = useMutation(ADD_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      setError(messages);
    },
  });

  const onSubmit = async (values) => {
    formik.setTouched({
      repoOwnerName: true,
      repoName: true,
      rating: true,
      review: true,
    });
    const { repoOwnerName, repoName, rating, review } = values;
    const rspData = await createReview({
      variables: {
        review: {
          ownerName: repoOwnerName,
          repositoryName: repoName,
          rating: Number(rating),
          text: review,
        },
      },
    });

    if (rspData?.data?.createReview?.repository?.id) {
      navigate(`/repo-detail/${rspData?.data?.createReview?.repository?.id}`);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.signInWrap}>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.repoOwnerName}
        onChangeText={formik.handleChange('repoOwnerName')}
        onBlur={formik.handleBlur('repoOwnerName')}
        style={[
          styles.inputText,
          formik.touched.repoOwnerName && formik.errors.repoOwnerName
            ? styles.errorBorder
            : null,
        ]}
      />
      {formik.touched.repoOwnerName && formik.errors.repoOwnerName && (
        <Text style={{ color: 'red' }}>{formik.errors.repoOwnerName}</Text>
      )}
      <TextInput
        placeholder='repo Name'
        value={formik.values.repoName}
        onChangeText={formik.handleChange('repoName')}
        onBlur={formik.handleBlur('repoName')}
        style={[
          styles.inputText,
          formik.touched.repoName && formik.errors.repoName
            ? styles.errorBorder
            : null,
        ]}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={{ color: 'red' }}>{formik.errors.repoName}</Text>
      )}
      <TextInput
        placeholder='rating between 0 - 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        style={[
          styles.inputText,
          formik.touched.rating && formik.errors.rating
            ? styles.errorBorder
            : null,
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder='review'
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        onBlur={formik.handleBlur('review')}
        style={[
          styles.inputText,
          formik.touched.review && formik.errors.review
            ? styles.errorBorder
            : null,
        ]}
      />

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
        Create Review
      </Button>
    </View>
  );
};

export default ReviewForm;
