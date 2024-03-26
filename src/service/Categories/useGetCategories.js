import restService from "../../utils/restService"
import { useQuery } from 'react-query'





export default function useGetCategories() {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const data = await restService('categories', '', "GET")
            return data
        },
        onError: (error) => console.log(error),
    })
    return {data, isLoading, isSuccess}
}
