import RepositoryItem from './RepositoryItem';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAIL } from '../graphQL/queries';
import Text from './styleComponent/Text';
import { useEffect, useState } from 'react';

function RepoDetail() {
  const { id } = useParams();
  const { data } = useQuery(GET_REPO_DETAIL, {
    variables: { repositoryId: id },
    skip: !id,
  });

  return <RepositoryItem item={data?.repository} />;
}

export default RepoDetail;
