import React, { useState } from 'react';
import { Platform, View, Pressable, FlatList, StyleSheet } from 'react-native';
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

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDirection, searchKeyword, setSearchKeyword, onChangeSearch }) => {
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
        ListFooterComponent={ItemFooter}
      />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [searchKeyword, setSearchKeyword] = useState('')

  const [filter] = useDebounce(searchKeyword, 400);

  const { repositories } = useRepositories(orderBy, orderDirection, filter);

  const onChangeSearch = query => setSearchKeyword(query);
  
  return(
    <RepositoryListContainer 
      repositories={repositories} 
      setOrderBy={setOrderBy} 
      setOrderDirection={setOrderDirection} 
      searchKeyword={searchKeyword} 
      setSearchKeyword={setSearchKeyword}
      onChangeSearch={onChangeSearch}
    />
  ) 
};

export default RepositoryList;

/*
import Text from './Text';
import TextInput from './TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';

<SearchBar style={styles.search} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  const searchIcon = <Icon name="search" size={20} color="#000" />;
  const closeIcon = <Icon name="close" size={30} color="#000" />;

  return (
    <View style={styles.searchContainer}>
      {searchKeyword.length < 1 ? <Text style={styles.searchIcon}>{searchIcon}</Text> : null}
      <TextInput style={styles.search} value={searchKeyword} onChangeText={(value) => setSearchKeyword(value)} />
      {searchKeyword.length > 0 ?
        <Pressable onPress={() => setSearchKeyword('')}>
          <Text style={styles.closeIcon}>{closeIcon}</Text>
        </Pressable>
      : null}
    </View>
  )
}

/*
 <View style={styles.searchContainer}>
    <Searchbar style={styles.search} placeholder="Search" value={searchKeyword} onChangeText={onChangeSearch} />
 </View>
*/

  /*
  searchIcon: {
    position: 'absolute',
    marginTop: 23,
    marginLeft: 25,
  },
  closeIcon: {
    //backgroundColor: '#000',
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    marginRight: 8,
    textAlign: 'center'
  }

      /*
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    */