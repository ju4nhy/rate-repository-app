import { View, Image, StyleSheet } from 'react-native';
import theme from './theme';
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  avatar: {
    height: 45,
    width: 45,
  },
  basicInfo: {
    marginLeft: 10,
    marginBottom: 5
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 15
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: theme.colors.textWhite,
    borderRadius: 5,
    marginLeft: 10,
    padding: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    marginLeft: 70
  },
  statsInfo: {
    alignItems: 'center',
    marginRight: 30
  },
});

const formatNumberSuffix = (num) => {
  let result = Math.abs(num) >= 1000 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  return result
}

const RepositoryItem = (data) => {
  return (
    <>
    <View style={styles.flexContainer}>
      <Image style={styles.avatar} source={{ uri: data.item.ownerAvatarUrl }} />
      <View>
          <Text fontWeight="bold" style={styles.basicInfo}>{data.item.fullName}</Text>
          <Text color="textSecondary" style={styles.basicInfo} >{data.item.description}</Text>
          <View style={styles.buttonContainer}> 
            <Text style={styles.button}>{data.item.language}</Text>
          </View>
      </View>
    </View>
    <View style={styles.statsContainer}>
        <View style={styles.statsInfo}>
          <Text fontWeight="bold">{formatNumberSuffix(data.item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statsInfo}>
          <Text fontWeight="bold">{formatNumberSuffix(data.item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statsInfo}>
          <Text fontWeight="bold">{data.item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statsInfo}>
          <Text fontWeight="bold">{data.item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </>
  );
};

export default RepositoryItem;