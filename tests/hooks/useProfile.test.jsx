/* eslint-disable react/prop-types */
import { renderHook, waitFor } from '@testing-library/react'; 
import { useProfile } from '@/hooks/useProfile'; 
import { getUser } from '@/services/profileService'; 
import { vi, describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


vi.mock('@/services/profileService', () => ({
    getUser: vi.fn(),
}));

const createWrapper = () => {
    const queryClient = new QueryClient();
    const Wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    Wrapper.displayName = 'QueryClientWrapper';  

    return Wrapper;
};

describe('useProfile', () => {
    it('should fetch user profile data successfully', async () => {
        const mockUserData = { name: 'John Doe', email: 'john.doe@example.com' }; 
        getUser.mockResolvedValueOnce(mockUserData); 
        const { result } = renderHook(() => useProfile(), { wrapper: createWrapper() }); 
        console.log(result.current.data)
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(getUser).toHaveBeenCalledTimes(1);

        expect(result.current.data).toEqual(mockUserData);
    });

    it.skip('should handle error when fetching user profile fails', async () => {
        const mockError = new Error('Failed to fetch user profile');
        getUser.mockRejectedValueOnce(mockError); 

        const { result } = renderHook(() => useProfile(), { wrapper: createWrapper() }); 
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(getUser).toHaveBeenCalledTimes(1);

        expect(result.current.error).toEqual(mockError);
    });

});