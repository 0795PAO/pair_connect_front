/* eslint-disable react/prop-types */
import { ArrowLeftIcon } from "lucide-react"
//import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoBackButton = ({ text }) => {
    const navigate = useNavigate();
    //const location = useLocation();
    //const [prevLocation, setPrevLocation] = useState(null);

    /* useEffect(() => {
        if (location.state?.from) {
            setPrevLocation(location.state.from);
        }
    }, [location]);
 */

    const handleGoBack = () => {
        navigate(-1)
        /* if (prevLocation) {
            navigate(prevLocation);
        } else {
            navigate('/'); 
        } */
    };

    return (
        <button
            onClick={() => handleGoBack()}
            className="text-white hover:text-primary flex items-center mb-4"
        >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {text}
        </button>
    )
}
export default GoBackButton