import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(AUTHENTICATE)

    const signIn = async ({ username, password }) => {
       const login = await mutate({ variables: { credentials: { username, password } } })
       await authStorage.setAccessToken(login.data.authenticate.accessToken);
       apolloClient.resetStore();
       return login
    };
    
    return [signIn, result];
};

export default useSignIn;