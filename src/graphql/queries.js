import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
        edges {
            node {
              id
              fullName
              description
              ownerAvatarUrl
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
            }
            cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
    }
  }
`;

/*
{
  repositories(first: 2) {
    totalCount
    edges {
      node {
        id
        fullName
        createdAt
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
*/

export const GET_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;