import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { REPO_ORDERBY } from '../graphQL/queries';
import { Picker } from '@react-native-picker/picker';
import { useMemo, useState } from 'react';
import Text from './styleComponent/Text';

const selectValue = [
  // {orderBy:"CREATED_AT", orderDirection: "DESC" }
  {
    label: 'Latest repositories',
    value: 0,
  },
  // {orderBy:"RATING_AVERAGE", orderDirection: "DESC" }
  {
    label: 'Highest rated repositories',
    value: 1,
  },
  // {orderBy:"RATING_AVERAGE", orderDirection: "ASC" }
  {
    label: 'Lowest rated repositories',
    value: 2,
  },
];

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PickerList = (props) => {
  return (
    <Picker
      selectedValue={props?.selectedValue}
      onValueChange={(itemValue, itemIndex) =>
        props?.setSelectedValue(itemValue)
      }
      style={{
        borderWidth: 0,
        height: 50,
        backgroundColor: '#e1e4e8',
      }}
    >
      {selectValue?.map((v, i) => (
        <Picker.Item key={i} label={v.label} value={v.value} />
      ))}
    </Picker>
  );
};

const RepositoryList = () => {
  // const { repositories } = useRepositories();
  const [selectedValue, setSelectedValue] = useState(0);
  const variables = useMemo(() => {
    switch (Number(selectedValue)) {
      case 1:
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 2:
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  }, [selectedValue]);

  const { data } = useQuery(REPO_ORDERBY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const repositoryNodes = data?.repositories
    ? data?.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={() => (
        <PickerList
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
    />
  );
};

export default RepositoryList;
