import restService from "../../utils/restService";
import { useMutation } from "react-query";

export default function useGetProfile(queryClient) {
  const { mutateAsync, isLoading, isError, isSuccess } = useMutation(
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
        sessionStorage.setItem("user", JSON.stringify(data));
        queryClient.invalidateQueries("products")
      } 
    }
  );
  return {
    getProfile: async (token) => mutateAsync(token),
    isLoading,
    isError,
    isSuccess,
  };
}
