import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW)

    const review = async ({ id }) => {
       const deleteReview = await mutate({ variables: { id } })
       return deleteReview
    };
    
    return [review, result];
};

export default useDeleteReview;