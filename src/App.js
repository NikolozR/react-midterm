import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 50000,
        refetchInterval: 50000,
        refetchOnWindowFocus: false,
        retryOnMount: false
      }
    }
  })


  return (
    <QueryClientProvider client={queryClient}>
      
    </QueryClientProvider>
  );
}

export default App;
