import { useHostedSessions } from "@/hooks/useHostedSessions";
import { useParticipatingSessions } from "@/hooks/useParticipatingSessions";
import { useInterestedSessions } from "@/hooks/useInterestedSessions";
import SessionCard from "../session/SessionCard";
import Loader from "../shared/Loader";

const MyProfileSession = () => {
  const { data: hostedSessions, isLoading: hostedLoading } =
    useHostedSessions();
  const { data: participatingSessions, isLoading: participatingLoading } =
    useParticipatingSessions();
  const { data: interestedSessions, isLoading: interestedLoading } =
    useInterestedSessions();

  if (hostedLoading || participatingLoading || interestedLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <h2 className="text-lg font-bold mb-2 sticky top-0 z-10 border-b-2 border-primary w-full">
          Sesiones Propias
        </h2>
        <div className="overflow-y-scroll max-h-[300px] lg:max-h-[400px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
          {hostedSessions?.length ? (
            hostedSessions.map((session) => (
              <SessionCard key={session.id} session={session} to={`/sessions/${session.id}`}/>
            ))
          ) : (
            <p>No tienes sesiones propias.</p>
          )}
        </div>
      </div>

      <div className="relative">
        <h2 className="text-lg font-bold mb-2 sticky top-0 z-10 border-b-2 border-primary w-full">
          Sesiones en las que participas
        </h2>
        <div className="overflow-y-scroll max-h-[300px] lg:max-h-[400px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
          {participatingSessions?.length ? (
            participatingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <p>No participas en ninguna sesión.</p>
          )}
        </div>
      </div>

      <div className="relative">
        <h2 className="text-lg font-bold mb-2 sticky top-0 z-10 border-b-2 border-primary w-full">
          Sesiones en las que estás interesadx
        </h2>
        <div className="overflow-y-scroll max-h-[300px] lg:max-h-[400px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
          {interestedSessions?.length ? (
            interestedSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <p>No tienes sesiones de interés.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileSession;
