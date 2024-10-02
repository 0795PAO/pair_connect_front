import { useQuery } from '@tanstack/react-query';
import api from '@/config/apiInterceptor';
import { PROJECT_URLS } from '@/config/apiUrls';

// Function to fetch project details by ID
const fetchProjectDetails = async ({ queryKey }) => {
    const [, id] = queryKey; // Get the project ID from queryKey
    console.log("Fetching project details for ID:", id); // Log the ID before making the request
    const response = await api.get(`${PROJECT_URLS.GET_PROJECTS}${id}`);
    console.log("Fetched project details response:", response.data); // Log the API response
    return response.data;
  };

// Custom hook to fetch project details by ID
export const useProjectDetails = (id) => {
  return useQuery({
    queryKey: ['project', id], // Pass the project ID as part of queryKey
    queryFn: fetchProjectDetails, // Use the fetch function
    enabled: !!id, // Only fetch when the ID is available
  });
};