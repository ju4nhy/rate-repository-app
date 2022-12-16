import { useQuery } from "@apollo/client";
import { Text, FlatList, StyleSheet } from 'react-native';
import { GET_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import ItemFooter from './ItemFooter';

const styles = StyleSheet.create({
    text: {
      margin: 10
    }
  })

const MyReviewsContainer = ({ reviews, refetch }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ListFooterComponent={reviews && reviews.length > 0 ? ItemFooter : null}
   />
  )
}

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true
    }
  }); 

  const reviews = data?.me.reviews.edges.map(edge => edge.node)

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (reviews && reviews.length < 1) return <Text style={styles.text}>No reviews.</Text>;

  return (
    <MyReviewsContainer reviews={reviews} refetch={refetch} />
  );
};

export default MyReviews;