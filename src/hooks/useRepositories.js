import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, { 
      fetchPolicy: 'cache-and-network',
  });

 if (error) return `Error! ${error}`;

 return {
    repositories: data && data.repositories,
    error,
    loading,
  };
}

export default useRepositories;