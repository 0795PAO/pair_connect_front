/* eslint-disable react/prop-types */
import { ClimbingBoxLoader } from "react-spinners"

const Loader = ({ loading, }) => {
    return (
        <div className="relative flex items justify-center">
            <ClimbingBoxLoader
                color="#4AD3E5"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}
export default Loader