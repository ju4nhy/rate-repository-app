import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from "react-router-native";
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import ItemSeparator from './ItemSeparator';
import ItemFooter from './ItemFooter';
import Text from "./Text";
import theme from "./theme";

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
  },
  ratingContainer: {
    display: 'flex',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: theme.colors.primary,
  },
  rating: {
   color: theme.colors.primary,
   fontSize: 12,
  },
  reviewContainer: {
    flex: 1, 
    flexWrap: 'nowrap',
    marginLeft: 10,
    marginRight: 15,
  },
  reviewText: {
    marginTop: 10,
  }
})

const ReviewItem = ({ review }) => {
  return (
    <>
    <ItemSeparator />
    <View style={styles.flexContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} fontSize="subheading" fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
    </>
  )
}

const ReviewsList = ({ repository }) => {
  const reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : [];
  let item = undefined
  let id = undefined

  reviews.item ? item = reviews.item : item = undefined
  reviews.item ? id = reviews.item.id : id = undefined
 
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem {...repository} />}
      ListFooterComponent={reviews.length > 0 ? ItemFooter : null}
    />
  )
}

const RepositoryInfo = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  return (
    <View style={{flex: 1}}>
      <ReviewsList repository={repository} />
    </View>
  );
};

export default RepositoryInfo;