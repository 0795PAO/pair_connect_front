import { useQuery } from "@tanstack/react-query";
import api from "@/config/apiInterceptor";
import { PROJECT_URLS } from "@/config/apiUrls";

// Función para obtener detalles del proyecto por su ID
const fetchProjectDetails = async ({ queryKey }) => {
  const [, id] = queryKey; // Extrae el projectId del queryKey
  console.log("Fetching project details for ID:", id);

  // Corrige la URL para evitar duplicación de 'projects'
  const response = await api.get(`${PROJECT_URLS.GET_PROJECTS}${id}/`);
  console.log("Fetched project details response:", response.data);
  return response.data;
};

// Custom hook para obtener detalles del proyecto por su ID
export const useProjectDetails = (id) => {
  return useQuery({
    queryKey: ["project", id], // Utiliza el projectId
    queryFn: fetchProjectDetails,
    enabled: !!id, // Solo ejecuta si hay un id
  });
};
