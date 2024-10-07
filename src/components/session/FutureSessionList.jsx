/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const FutureSessionList = ({ futureSessions }) => {
    const navigate = useNavigate();
    return (
        <ul>
            {futureSessions.map((futureSession) => (
                <li key={futureSession.id}>
                    <button
                        className="text-blue-500 underline"
                        onClick={() => navigate(`/sessions/${futureSession.id}`)}
                    >
                        {new Date(futureSession.schedule_date_time).toLocaleString()}{" "}
                        - {futureSession.description}
                    </button>
                </li>
            ))}
        </ul>
    )
}
export default FutureSessionList