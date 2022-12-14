import React, { useState } from 'react';
import { Platform, View, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import ItemFooter from './ItemFooter';
import useRepositories from '../hooks/useRepositories';
import theme from './theme'
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.separator,
  },
  picker: {
    backgroundColor: theme.colors.separator,
    borderWidth: 0,
    padding: 15,
    marginLeft: Platform.OS === "android" ? 8 : 0,
  },
  search: {
    backgroundColor: '#FFF',
    margin: 15,
    borderRadius: 10
  },
});

const Header = ({ selected, setSelected, searchKeyword, setOrderBy, setOrderDirection, onChangeSearch }) => {
  return (
    <View style={styles.container}>
      <Searchbar style={styles.search} value={searchKeyword} onChangeText={onChangeSearch} />
      <SortingMenu selected={selected} setSelected={setSelected} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
    </View>
  )
}

const SortingMenu = ({ selected, setSelected, setOrderBy, setOrderDirection }) => {
  return (
      <Picker
        style={styles.picker}
        prompt="Select an item..."
        selectedValue={selected}
        onValueChange={(itemValue) => {
            setSelected(itemValue)
            setOrderBy(itemValue)

            if(itemValue === "CREATED_AT") setOrderDirection("DESC")
            if(itemValue === "RATING_AVERAGE_DESC") setOrderDirection("DESC") 
            if(itemValue === "RATING_AVERAGE_ASC") setOrderDirection("ASC")
          }
        }>
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
    </Picker>
  )
}

export const RepositoryListContainer = ({ repositories, onEndReach, setOrderBy, setOrderDirection, searchKeyword, onChangeSearch }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];  // Get the nodes from the edges array
  const [selected, setSelected] = useState();

  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        ListHeaderComponent={
          <Header
            selected={selected} 
            setSelected={setSelected} 
            setOrderBy={setOrderBy} 
            setOrderDirection={setOrderDirection} 
            searchKeyword={searchKeyword} 
            onChangeSearch={onChangeSearch}
          />
        }
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ItemFooter}
      />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [searchKeyword, setSearchKeyword] = useState('')

  const [filter] = useDebounce(searchKeyword, 400);

  const { repositories, fetchMore } = useRepositories({ 
    first: 4,
    orderBy,
    orderDirection,
    filter
  });
  
  const onChangeSearch = query => setSearchKeyword(query);

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };
  
  return(
    <RepositoryListContainer 
      repositories={repositories} 
      setOrderBy={setOrderBy} 
      setOrderDirection={setOrderDirection} 
      searchKeyword={searchKeyword} 
      setSearchKeyword={setSearchKeyword}
      onChangeSearch={onChangeSearch}
      onEndReach={onEndReach}
    />
  ) 
};

export default RepositoryList;