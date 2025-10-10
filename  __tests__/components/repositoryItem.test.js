import * as Apollo from '@apollo/client';
import { render, screen } from '@testing-library/react-native';
import RepositoryList from '../../components/RepositoryList';
import { formatCount } from '../../utils/formatCount';
jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual, // 保留 gql、ApolloProvider 等真实导出
    useQuery: jest.fn(), // 仅 mock useQuery
  };
});

describe('RepositoryList', () => {
  it('renders correctly', () => {
    Apollo.useQuery.mockReturnValue({
      data: {
        repositories: {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        },
      },
    });

    render(<RepositoryList />);
    expect(screen.getByText('async-library/react-async')).toBeTruthy();
    expect(
      screen.getByText('Flexible promise-based React data loader')
    ).toBeTruthy();
    expect(screen.getByText('JavaScript')).toBeTruthy();
    expect(screen.getByText('69')).toBeTruthy();
    expect(screen.getByText(formatCount(1760))).toBeTruthy();
    expect(screen.getByText('72')).toBeTruthy();
    expect(screen.getAllByText('3')).toHaveLength(2);
  });
});
