import restService from "../../utils/restService";
import { useMutation } from "react-query";

export default function useGetProfile(queryClient) {
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async (token) => {
      const data = await restService(
        "auth",
        "profile",
        "GET",
        {
          Authorization: `Bearer ${token}`,
        },
        ""
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("products")
      } 
    }
  );
  return {
    getProfile: async (token) => mutate(token),
    isLoading,
    isError,
    isSuccess,
  };
}
