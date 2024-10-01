import UserHomePage from '@/pages/UserHomePage';
import { useAuth } from '@/hooks/useAuth';
import HomePage from '@/pages/HomePage';

const HomePageWrapper = () => {
    const { isAuthenticated } = useAuth();


    return isAuthenticated ? <UserHomePage /> : <HomePage />;
};

export default HomePageWrapper