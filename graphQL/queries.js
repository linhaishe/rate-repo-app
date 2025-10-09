import { gql } from '@apollo/client';

export const ALL_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          createdAt
          description
          forksCount
          id
          name
          openIssuesCount
          ownerAvatarUrl
          watchersCount
          userHasReviewed
          language
          url
          stargazersCount
          reviewCount
          ratingAverage
          ownerName
        }
      }
    }
  }
`;

export const USER_AUTH = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

export const IS_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
