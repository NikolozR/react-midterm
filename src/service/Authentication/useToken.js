import { useMutation } from "react-query";
import restService from "../../utils/restService";

export default function useToken(queryClient) {
  const { mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (body) => {
      try {
        const data = await restService("auth", "login", "POST", "", body);
        return data;
      } catch (err) {
        throw new Error(err);
      }
    },
    {
      onSuccess: (data) => {
        sessionStorage.setItem("access_token", data.access_token);
        localStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        queryClient.invalidateQueries("products");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const getToken = async (body) => {
    const response = await mutateAsync(body);
    return response;
  };
  return {
    getToken: getToken,
    isLoading,
    isError,
    isSuccess,
  };
}
