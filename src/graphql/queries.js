import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
        edges {
            node {
              ownerName
              description
              ownerAvatarUrl
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
            }
        }
    }
  }
`;

export const GET_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
    }
  }
`;