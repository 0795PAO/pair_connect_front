import { useParams } from "react-router-dom"; // To access the project ID from the URL
import { useProjectDetails } from "@/hooks/useProjectDetails"; // Hook to fetch project details
import Loader from "@/components/shared/Loader"; // Loader component for loading states

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from the URL
  const { data: project, isLoading, isError } = useProjectDetails(id); // Fetch project details

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError || !project) {
    return <p>Error loading project or project not found.</p>;
  }

  // Project image URL or default image if none is provided
  const projectImage = project.image_url || "/default_project_image.png";

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <img
        src={projectImage} // Full URL to the image from the backend
        alt="Project"
        className="w-full h-64 object-cover rounded-md"
      />
      <section>
        <h2 className="text-xl font-semibold">About the Project</h2>
        <p>{project.description}</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Required Skills</h2>
        <p>Stack: {project.stack_name}</p>
        <p>Languages and Frameworks: {project.language_names.join(", ")}</p>
        <p>Level: {project.level_name}</p>
      </section>
      {/* Placeholder section for session creation */}
      <section>
        <h2 className="text-xl font-semibold">Create Session</h2>
        <p>This is a placeholder for future session creation functionality.</p>
      </section>
    </div>
  );
};

export default ProjectDetails;