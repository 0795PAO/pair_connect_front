/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const SimplePopUp = ({ closePopup, message, closeText }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">{message}</h3>
        <div className="flex justify-center">
          <Button onClick={closePopup}>{closeText}</Button>
        </div>
      </div>
    </div>
  );
};

export default SimplePopUp;
