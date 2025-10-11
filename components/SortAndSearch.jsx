import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

/**
 * 为什么这个版本不会失焦
ListHeaderComponent 接收的是一个固定的 React 元素，不会在 FlatList 每次渲染时被重新创建。
RepositoryListHeader 与 PickerList 都用 React.memo 包裹，除非 props 真正变化，否则不会重新渲染。
输入框 (Searchbar) 的状态在父组件中持久化，不会因为组件卸载而丢失。
**/

const selectValue = [
  { label: 'Latest repositories', value: 0 },
  { label: 'Highest rated repositories', value: 1 },
  { label: 'Lowest rated repositories', value: 2 },
];

const PickerList = React.memo(({ selectedValue, setSelectedValue }) => (
  <Picker
    selectedValue={selectedValue}
    onValueChange={setSelectedValue}
    style={{
      borderWidth: 0,
      height: 50,
      backgroundColor: '#e1e4e8',
    }}
  >
    {selectValue.map((v, i) => (
      <Picker.Item key={i} label={v.label} value={v.value} />
    ))}
  </Picker>
));

// 把 Header 抽出来，保证它不会每次被重建
const RepositoryListHeader = React.memo(
  ({ searchQuery, setSearchQuery, selectedValue, setSelectedValue }) => {
    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
        <Searchbar
          placeholder='Search'
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <PickerList
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </View>
    );
  }
);

export default RepositoryListHeader;
