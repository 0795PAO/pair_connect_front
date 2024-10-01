import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import router from './router';
import { useEffect } from 'react';
import { fetchLevels } from './hooks/useLevels';
import { fetchStacks } from './hooks/useStacks';
import { fetchLanguages } from './hooks/useLanguages';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false
        },
    },
});




const App = () => {

    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ['levels'],
            queryFn: fetchLevels
        });
        queryClient.prefetchQuery(
            {
                queryKey: ['stacks'],
                queryFn: fetchStacks
            });
        queryClient.prefetchQuery({
            queryKey: ['languages'], 
            queryFn: fetchLanguages
        });
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App