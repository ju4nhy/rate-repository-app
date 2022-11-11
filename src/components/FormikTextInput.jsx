import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from './theme'

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1
  },
  errorStyle: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#d73a4a'
  },
  errorText: {
    color: theme.colors.error,
    marginLeft: 10,
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={showError ? styles.errorStyle : styles.input}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;