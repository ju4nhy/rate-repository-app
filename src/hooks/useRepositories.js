import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, filter) => {
  let order = orderBy

  if(orderBy === "RATING_AVERAGE_DESC") order = orderBy.slice(0, -5);
  if(orderBy === "RATING_AVERAGE_ASC") order = orderBy.slice(0, -4);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, { 
      fetchPolicy: 'cache-and-network',
      variables: { 
        orderBy: order, 
        orderDirection: orderDirection, 
        searchKeyword: filter,
      }
  });

 if (error) return `Error! ${error}`;

 return {
    repositories: data && data.repositories,
    error,
    loading,
  };
}

export default useRepositories;