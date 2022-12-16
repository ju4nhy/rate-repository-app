import { View, Pressable, Alert, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-native";
import Text from './Text';
import ItemSeparator from './ItemSeparator';
import theme from './theme'
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#FFF',
    },
    flexContainer: {
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
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    viewButton: {
      backgroundColor: 'blue',
      margin: 15,
      marginRight: 5,
    },
    deleteButton: {
      backgroundColor: 'red',
      margin: 15,
      marginLeft: 5,
    },
    buttonText: {
      color: '#FFF',
      padding: 10,
    }
  })

const ReviewItem = ({ review, refetch }) => {
    const [deleteRev] = useDeleteReview();
    const navigate = useNavigate()

    const deleteAlert = () =>
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
          {
            text: "CANCEL",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "DELETE", onPress: () => deleteReview() }
        ]
    );

    const deleteReview = async() => {  
      try {
        await deleteRev({ id: review.id });
        refetch()
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <>
        <ItemSeparator />
        <View style={styles.mainContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating} fontSize="subheading" fontWeight="bold">{review.rating}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <Text fontWeight="bold">{review.repository ? review.repository.fullName : review.user.username}</Text>
              <Text color="textSecondary">{new Date(review.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          </View>
          {review.repository ? 
            <View style={styles.buttonContainer}>
              <Pressable style={styles.viewButton} onPress={() => navigate(`/${review.repository.id}`)}>
                <Text fontWeight="bold" style={styles.buttonText}>View repository</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={deleteAlert}>
                <Text fontWeight="bold" style={styles.buttonText}>Delete review</Text>
              </Pressable>
            </View>
          : null}
        </View>
      </>
    )
}

export default ReviewItem