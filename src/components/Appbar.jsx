import { useQuery, useApolloClient } from '@apollo/client';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from "./Text";
import theme from './theme';
import { GET_USER } from '../graphql/queries'
import useAuthStorage from "../hooks/useAuthStorage";

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

const AppBarTab = (props) => {
  return (
    <>
      <Pressable style={styles.container}>
        <Link to={props.to}>
          <Text fontSize="subheading" fontWeight="bold" style={styles.text}>{props.title}</Text> 
        </Link>
      </Pressable>
    </>
  )
};

const SignOutButton = (props) => {
  return (
    <>
      <Pressable style={styles.container}>
        <Link to="/">
          <Text fontSize="subheading" fontWeight="bold" style={styles.text} onPress={props.signOut}>Sign out</Text> 
        </Link>
      </Pressable>
    </>
  )
}

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data } = useQuery(GET_USER)

  const isLoggedIn = data && data.me

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
      <>
        <View style={styles.container}> 
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             <AppBarTab to="/" title="Repositories" />
             {!isLoggedIn && <AppBarTab to="signin" title="Sign in" />}
             {isLoggedIn && <SignOutButton to="/" signOut={signOut} title="Sign out"/> }
           </ScrollView>
        </View>
      </> 
  )
};

export default AppBar;