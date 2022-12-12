import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-native";
import { Formik } from 'formik';
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from './theme'
import * as yup from 'yup';
import useSignUp from "../hooks/useSignUp";
import useSignIn from '../hooks/useSignIn';

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
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1)
    .max(30),
  password: yup
    .string()
    .required('Password is required')
    .min(5)
    .max(50),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .min(5)
    .max(50)
    .oneOf([yup.ref('password'), "Password confirmation must match password."]),
});

export const SignUpForm = ({ onSubmit }) => {
  return (                                                        
    <View>
      <FormikTextInput name="username" placeholder="Username" testID="Username"/> 
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}/>
      <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true}/>
      <Pressable onPress={onSubmit} style={styles.button} testID="Submit">
        <Text fontWeight="bold" style={styles.text}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
   <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
   </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
      const { username, password } = values;

      try {
        const { data } = await signUp({ username, password });
        if (data) {
          await signIn({ username, password})
          navigate("/", { replace: true }) 
        }
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;