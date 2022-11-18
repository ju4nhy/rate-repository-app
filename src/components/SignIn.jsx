import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from './theme'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";

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
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (                                                        
    <View>
      <FormikTextInput name="username" placeholder="username" /> 
      <FormikTextInput name="password" placeholder="password" secureTextEntry={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontWeight="bold" style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
      const { username, password } = values;

      try {
        const { data } = await signIn({ username, password });
        console.log(data)
        data ? navigate("/", { replace: true }) : null;
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;