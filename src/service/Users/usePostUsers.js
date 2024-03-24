import restService from "../../utils/restService";
import { useMutation } from "react-query";

export default function usePostUsers(queryClient) {
  const { mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (body) => {
      return await restService("users", "", "POST", "", body);
    },
    {
      onSuccess: (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        queryClient.invalidateQueries("users")
      } 
    }
  );

  return {
    createUser: (body) => mutateAsync(body),
    isLoading,
    isError,
    isSuccess,
  };
}
