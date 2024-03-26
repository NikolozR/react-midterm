import restService from "../../utils/restService"
import { useQuery } from 'react-query'





export default function useGetProducts(id) {
    const {data, isLoading, isSuccess, refetch} = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const data = await restService('products', id, "GET")
            return data
        },
        onError: (error) => console.log(error),
    })
    return {data, isLoading, isSuccess, refetch}
}
