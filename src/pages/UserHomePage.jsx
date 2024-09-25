import { EventCalendar } from "@/components/EventCalendar";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

const UserHomePage = () => {
  return (
    <div data-testid="user-home-page">
      <Navbar />
      <EventCalendar />
      <Footer />
    </div>
  );
};
export default UserHomePage;
