import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './Appbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RepositoryList from './RepositoryList';
import RepositoryInfo from './RepositoryInfo';
import Review from './Review';
import MyReviews from './MyReviews'
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.separator,
  },
});

const Main = () => {
  return (
    <>
      <AppBar style={styles.appbar} />
      <View style={styles.container}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path='/:id' element={<RepositoryInfo />} />
          <Route path='/review' element={<Review />} />
          <Route path='/myreviews' element={<MyReviews />} />
        </Routes> 
      </View>
    </>
  );
};

export default Main;