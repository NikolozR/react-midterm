import restService from "../../utils/restService";
import { useMutation, queryClient } from "react-query";

export default function usePostProducts() {
  const { mutate, isLoading, isError, isSuccess } = useMutation(restService, {
    onSuccess: queryClient.invalidateQueries("products"),
  });
  return {
    createProduct: (header) => mutate("auth", "", "GET", header, ""),
    isLoading,
    isError,
    isSuccess,
  };
}
