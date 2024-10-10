import { useState, useEffect } from "react";
import Loader from "@/components/shared/Loader";
import { useProfile } from "@/hooks/useProfile";
import { useSuggestedSessions } from "@/hooks/useSuggestedSessions";
import CompleteProfileModal from "@/components/profile/CompleteProfileModal";
import { normalizeDate } from "@/utils/formaDateAndTime";
import { useAllSessions } from "@/hooks/useAllSessions";
import SuggestedSessions from "@/components/session/SuggestedSessions";
import SessionSection from "@/components/session/SessionSection";
const UserHomePage = () => {
  const { data: user, isLoading: isProfileLoading, error } = useProfile();
  const { data: suggestedSessions, isLoading: isSessionsLoading } = useSuggestedSessions();
  const { data: allSessions, isLoading: isAllSessionsLoading, error: allSessionsError } = useAllSessions();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (user && (!user.prog_language || !user.stack)) {
      setOpen(true);
    }
  }, [user]);


  if (isProfileLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }


  const filteredSuggestedSessions = suggestedSessions?.filter((session) => {
    const sessionDate = normalizeDate(new Date(session.schedule_date_time));
    const today = normalizeDate(new Date());
    return sessionDate >= today;
  });



  return (
    <div className="user-home-page flex flex-col items-center w-full gap-5">
          <h1 className="mb-4 font-poppins font-bold text-6xl leading-[120%] text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient)" }}>
            Pair Connect
          </h1>
          <h2 className="self-start text-3xl font-semibold">
            Hola, {user?.username}
          </h2>

          <h3 className="self-start text-xl">Sesiones sugeridas para ti:</h3>
          <div className="mt-5">
            {isSessionsLoading ? <Loader /> : <SuggestedSessions sessions={filteredSuggestedSessions} />}
          </div>
          <h3 className="self-start text-xl mt-16">¡Busca otras sesiones de tu interés!</h3>
          {
            isAllSessionsLoading ? <Loader /> :
            allSessionsError ? <div className="text-red-500">Hubo un error al cargar las sesiones.</div> :
            <SessionSection sessions={allSessions} to="/sessions/" />
          }
          
          <CompleteProfileModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default UserHomePage;
