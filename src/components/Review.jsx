import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-native";
import { Formik } from 'formik';
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import theme from './theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textWhite,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number('Rating must be number')
    .integer('Rating must be integer')
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string(),
});

export const ReviewForm = ({ onSubmit }) => {
  return (                                                        
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" /> 
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit} style={styles.button} testID="Submit">
        <Text fontWeight="bold" style={styles.text}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
   <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
   </Formik>
  )
}

const Review = () => {
  const [review] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
      const { ownerName, repositoryName, rating, text } = values;

      try {
        const { data } = await review({ ownerName: ownerName, repositoryName: repositoryName, rating: Number(rating), text: text });
        const id = data.createReview.id.slice(37)
        data ? navigate(`/${id}`, { replace: true }) : null;
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <ReviewContainer onSubmit={onSubmit} />
  );
};

export default Review;