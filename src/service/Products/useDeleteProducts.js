import restService from "../../utils/restService";
import { useMutation, queryClient } from "react-query";

export default function usePostProducts() {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    restService,
    {
      onSuccess: queryClient.invalidateQueries("products"),
    }
  );
  return {
    changeProduct: (id) => mutate("products", id, "DELETE"),
    isLoading,
    isError,
    isSuccess,
    error,
  };
}
