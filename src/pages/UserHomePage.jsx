import { useEffect, useState } from "react";
import { EventCalendar } from "@/components/shared/EventCalendar";
import Loader from "@/components/shared/Loader";
import Modal from "@/components/shared/Modal";
import { useProfile } from "@/hooks/useProfile";



const UserHomePage = () => {
  const { data: user, isLoading, error } = useProfile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && (!user.prog_language || !user.stack || !user.level)) {
      setOpen(true);
    }
  }, [user]);


  const onOpenChange = () => {
    setOpen(false);
  };

  return (
    <div data-testid="user-home-page" className="flex flex-col items-center w-full gap-5">
      {isLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {user && <> <h1 className="mb-4 font-poppins font-bold text-6xl leading-[120%] text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
        Pair Connect
      </h1>
        <h2 className="self-start text-3xl font-semibold">Hola, {user?.username}</h2>
        <EventCalendar />
        <Modal
          title="Completa tu perfil"
          message="Completa tu perfil para poder ver filtrar las sessiones para ti"
          border_color="primary"
          open={open}
          onOpenChange={onOpenChange}
        />
      </>}
    </div>

  );
};
export default UserHomePage
