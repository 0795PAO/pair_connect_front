/* eslint-disable react/prop-types */
import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ sessionId, text }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(`/sessions/${sessionId}`)}
            className="text-white hover:text-primary flex items-center mb-4"
        >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {text}
        </button>
    )
}
export default GoBackButton