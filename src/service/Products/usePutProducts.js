import restService from "../../utils/restService"
import { useMutation, queryClient } from "react-query";

export default function usePostProducts() {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(restService, {
    onSuccess: queryClient.invalidateQueries("products"),
  });
  return {
    changeProduct: (id, body) => mutate("products", id, "PUT", "", body),
    isLoading,
    isError,
    isSuccess,
    error
  };
}
