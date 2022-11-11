import { View, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: theme.colors.separator,
    height: 5,
    marginTop: 15,
    marginBottom: 15
  },
});

const ItemSeparator = () => {
    return (
      <View style={styles.separator} />
    )
}

export default ItemSeparator;