import { View, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: theme.colors.separator,
    height: 5
  }
});

const ItemFooter = () => {
    return <View style={styles.footer} />
}

export default ItemFooter;