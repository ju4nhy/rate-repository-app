import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW)

    const review = async ({ ownerName, repositoryName, rating, text }) => {
       const createReview = await mutate({ variables: { ownerName, repositoryName, rating, text } })
       return createReview
    };
    
    return [review, result];
};

export default useReview;