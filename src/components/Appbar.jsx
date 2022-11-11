import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from "./Text";
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.appBar,
    paddingTop: Constants.statusBarHeight,
    marginBottom: 15,
  },
  text: {
    color: theme.colors.textWhite,
    marginTop: 8,
    marginRight: 15,
    marginLeft: 15,
  }
});

const AppBarTab = () => {
  return (
    <>
      <Pressable style={styles.container}>
        <Link to="/">
          <Text fontSize="subheading" fontWeight="bold" style={styles.text}>Repositories</Text> 
        </Link>
        <Link to="/signin">
          <Text fontSize="subheading" fontWeight="bold" style={styles.text}>Sign in</Text> 
        </Link>
      </Pressable>
    </>
  )
};

const AppBar = () => {
  return (
      <>
        <View style={styles.container}> 
           <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <AppBarTab />
           </ScrollView>
        </View>
      </> 
  )
};

export default AppBar;