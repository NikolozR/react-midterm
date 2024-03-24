import { useQuery } from 'react-query'
import restService from '../../utils/restService'




export default function useToken(body) {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const data = await restService('auth', 'login', 'POST', '', body)
            return data
        },
        onError: (error) => console.log(error),
    })
    return {data, isLoading, isSuccess}
}
