import restService from "../../utils/restService"
import { useMutation, queryClient } from "react-query";

export default function usePostProducts() {
  const { mutate, isLoading, isError, isSuccess } = useMutation(restService, {
    onSuccess: queryClient.invalidateQueries("users"),
  });
  return {
    createProduct: (body) => mutate("users", "", "POST", "", body),
    isLoading,
    isError,
    isSuccess,
  };
}
