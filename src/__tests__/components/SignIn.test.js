import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);
  
        fireEvent.changeText(getByTestId("Username"), "007");
        fireEvent.changeText(getByTestId("Password"), "jamesbond");
        fireEvent.press(getByTestId("Submit"));
        
        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit.mock.calls[0][0]).toEqual({ username: "007", password: "jamesbond" });
        });
    });
  });
});