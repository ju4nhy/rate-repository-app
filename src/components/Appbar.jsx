import { useQuery, useApolloClient } from '@apollo/client';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from "react-router-native";
import Constants from 'expo-constants';
import Text from "./Text";
import theme from './theme';
import useAuthStorage from "../hooks/useAuthStorage";
import { GET_USER } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.appBar,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 5,
  },
  text: {
    color: theme.colors.textWhite,
    marginTop: 8,
    marginRight: 15,
    marginLeft: 15,
  },
  loginText: {
    color: '#FFF',
    marginTop: 8,
    marginLeft: 15,
  },
  loggedIn: {
    flexDirection: 'row',
    backgroundColor: theme.colors.appBar,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 5,
  },
  username: {
    color: theme.colors.primary,
    marginTop: 8,
    marginLeft: 5,
  }
});

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

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(GET_USER)

  const isLoggedIn = data && data.me

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  }

  return (
      <>
        <View style={styles.loggedIn}>
          {isLoggedIn && <Text style={styles.loginText}>Logged in as</Text>}
          {isLoggedIn && <Text style={styles.username} fontWeight="bold" >{data?.me.username}</Text>}
        </View>
        <View style={styles.container}> 
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             <AppBarTab to="/" title="Repositories" />
             {!isLoggedIn && <AppBarTab to="signin" title="Sign in" />}
             {!isLoggedIn && <AppBarTab to="signup" title="Sign up" />}
             {isLoggedIn && <AppBarTab to="review" title="Create a review" />}
             {isLoggedIn && <AppBarTab to="myreviews" title="My reviews" />}
             {isLoggedIn && <SignOutButton to="/" signOut={signOut} title="Sign out"/> }
           </ScrollView>
        </View>
      </> 
  )
};

export default AppBar;