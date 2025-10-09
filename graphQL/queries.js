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
