// import { useQuery } from "@tanstack/react-query";
// import { checkIfUserIsParticipant } from "@/services/participantsService";

// export const useCheckIfUserIsParticipant = (sessionId, userId) => {
//     return useQuery(
//         {queryKey: ["checkIfUserIsParticipant", sessionId, userId],
//         queryFn: () => checkIfUserIsParticipant(sessionId, userId),
//         {
//             enabled: !!sessionId && !!userId,
//         }}
//     );
// };