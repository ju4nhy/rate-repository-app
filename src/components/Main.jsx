import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './Appbar'
import SignIn from './SignIn'
import RepositoryList from './RepositoryList'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1
  },
});

const Main = () => {
  return (
    <>
      <AppBar style={styles.appbar} />
      <View style={styles.container}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes> 
      </View>
    </>
  );
};

export default Main;