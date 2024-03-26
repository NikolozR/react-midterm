import restService from "../../utils/restService";
import { useMutation } from "react-query";

export default function usePostProducts(queryClient) {
  const { mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (body) => {
      try {
        return await restService("products", "", "POST", "", body);
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
      },
      onError: (error) => {
        console.log(error);
      },
    },
    {
      onSuccess: queryClient.invalidateQueries("products"),
    }
  );
  return {
    createProduct: (body) => mutateAsync(body),
    isLoading,
    isError,
    isSuccess,
  };
}
