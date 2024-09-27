import UserHomePage from "@/pages/UserHomePage";
import { useAuth } from "@/hooks/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import HomePage from "@/pages/HomePage";

const HomePageWrapper = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  // useTokenRefresh(setIsAuthenticated);

  return isAuthenticated ? <UserHomePage /> : <HomePage />;
};

export default HomePageWrapper;
