import restService from "../../utils/restService";
import { useMutation } from "react-query";

export default function useDeleteProducts(queryClient) {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (data) => {
      return restService("products", data, "DELETE");
    },
    {
      onSuccess: () => queryClient.invalidateQueries("products"),
    }
  );
  return {
    deleteProduct: (id) => mutate(id),
    isLoading,
    isError,
    isSuccess,
    error,
  };
}
