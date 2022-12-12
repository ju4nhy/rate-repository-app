import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { Link } from "react-router-native";
import theme from './theme';
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 20,
  },
  avatar: {
    height: 45,
    width: 45,
  },
  infoContainer: {
    flex: 1, 
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    marginRight: 15,
  },
  basicInfo: {
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 15,
  },
  languageContainer: {
    marginTop: 8,
    marginBottom: 15
  },
  language: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: theme.colors.textWhite,
    borderRadius: 5,
    marginLeft: 10,
    padding: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingLeft: 70,
    paddingBottom: 8,
  },
  statsInfo: {
    alignItems: 'center',
    marginRight: 30,
    marginBottom: 10
  },
  gitButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});

export const formatNumberSuffix = (num) => {
  let result = Math.abs(num) >= 1000 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  return result
}

const RepositoryItem = (repository) => {
  let repo = undefined
  repository.item ? repo = repository.item : repo = repository

  return (
    <>
      <Pressable>
        <Link to={repo.id}>
            <View testID="repositoryItem">
              <View style={styles.flexContainer}>
                <Image style={styles.avatar} source={{ uri: repo.ownerAvatarUrl }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.basicInfo} fontWeight="bold">{repo.fullName}</Text>
                    <Text style={styles.basicInfo} color="textSecondary">{repo.description}</Text>
                    <View style={styles.languageContainer}> 
                      <Text style={styles.language}>{repo.language}</Text>
                    </View>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statsInfo}>
                  <Text fontWeight="bold">{formatNumberSuffix(repo.stargazersCount).toString()}</Text>
                  <Text color="textSecondary">Stars</Text>
                </View>
                <View style={styles.statsInfo}>
                  <Text fontWeight="bold">{formatNumberSuffix(repo.forksCount).toString()}</Text>
                  <Text color="textSecondary">Forks</Text>
                </View>
                <View style={styles.statsInfo}>
                  <Text fontWeight="bold">{repo.reviewCount}</Text>
                  <Text color="textSecondary">Reviews</Text>
                </View>
                <View style={styles.statsInfo}>
                  <Text fontWeight="bold">{repo.ratingAverage}</Text>
                  <Text color="textSecondary">Rating</Text>
                </View>
              </View>
              <View style={styles.statsContainer}>
                {repo.url ? 
                <Pressable style={styles.gitButton}>
                  <Text fontWeight="bold" color="white" style={styles.text} onPress={() => Linking.openURL(repo.url)}>Open in Github</Text>
                </Pressable>
                : null}
              </View>
            </View>
        </Link>
      </Pressable>
    </>
  );
};

export default RepositoryItem;