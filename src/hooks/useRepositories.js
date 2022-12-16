import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ first, orderBy, orderDirection, filter }) => {
  let order = orderBy

  if(orderBy === "RATING_AVERAGE_DESC") order = orderBy.slice(0, -5);
  if(orderBy === "RATING_AVERAGE_ASC") order = orderBy.slice(0, -4);

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { 
      fetchPolicy: 'cache-and-network',
      variables: {
        first: first,
        orderBy: order,
        orderDirection: orderDirection,
        searchKeyword: filter,
      }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first: first, 
        orderBy: order,
        orderDirection: orderDirection,
        searchKeyword: filter,
      },
    });
  };

return {
    repositories: data && data.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
}

export default useRepositories;