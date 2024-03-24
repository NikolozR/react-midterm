import restService from "../../utils/restService"
import { useMutation, queryClient } from "react-query";

export default function usePostProducts() {
  const { mutate, isLoading, isError, isSuccess } = useMutation(restService, {
    onSuccess: queryClient.invalidateQueries("products"),
  });
  return {
    createProduct: (body) => mutate("products", "", "POST", "", body),
    isLoading,
    isError,
    isSuccess,
  };
}
