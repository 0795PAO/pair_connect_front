import { useEffect, useState } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import CompleteProfileModal from "@/components/project/CompleteProfileModal";



const UserHomePage = () => {
  const { data: user, isLoading, error } = useProfile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && (!user.prog_language || !user.stack )) {
      setOpen(true);
    }
  }, [user]);


  return (
    <div data-testid="user-home-page" className="flex flex-col gap-5 w-full items-center">
      {isLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {user && <> <h1 className="mb-4 font-poppins font-bold text-6xl leading-[120%] text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
        Pair Connect
      </h1>
        <h2 className="text-3xl font-semibold self-start">Hola, {user?.username}</h2>
        <EventCalendar />
        <CompleteProfileModal open={open} onOpenChange={setOpen} />
      </>}
    </div>

  );
};
export default UserHomePage;
