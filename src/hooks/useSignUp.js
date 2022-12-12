import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignUp = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(CREATE_USER)

    const signUp = async ({ username, password }) => {
       const register = await mutate({ variables: { username, password } })
       //await authStorage.setAccessToken(login.data.authenticate.accessToken);
       //apolloClient.resetStore();
       return register
    };
    
    return [signUp, result];
};

export default useSignUp;