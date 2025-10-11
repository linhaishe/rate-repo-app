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

export const GET_REPO_DETAIL = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      watchersCount
      fullName
      forksCount
      description
      id
      language
      name
      openIssuesCount
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      stargazersCount
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

export const ADD_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      createdAt
      id
      user {
        id
        username
      }
      rating
      text
      repository {
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      reviewCount
      username
    }
  }
`;

/**
 * @orderby CREATED_AT / RATING_AVERAGE
 * @orderDirection ASC / DESC
 */

export const REPO_ORDERBY = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          createdAt
          description
          forksCount
          fullName
          id
          language
          name
          openIssuesCount
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
          url
          watchersCount
        }
      }
    }
  }
`;
