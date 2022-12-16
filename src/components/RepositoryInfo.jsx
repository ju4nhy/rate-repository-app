import { View, FlatList } from 'react-native';
import { useParams } from "react-router-native";
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import ItemFooter from './ItemFooter';
import ReviewItem from './ReviewItem'

const ReviewsList = ({ repository, onEndReach }) => {
  const reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : [];
 
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem {...repository} />}
      ListFooterComponent={reviews.length > 0 ? ItemFooter : null}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const RepositoryInfo = () => {
  const { id } = useParams()
  const { repository, fetchMore } = useRepository({ 
    first: 4, 
    id: id,
  });

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };

  return (
    <View>
      <ReviewsList repository={repository} onEndReach={onEndReach} />
    </View>
  );
};

export default RepositoryInfo;