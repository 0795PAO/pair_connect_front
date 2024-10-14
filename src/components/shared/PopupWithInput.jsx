/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
const PopupWithInput = ({
  closePopup,
  saveMessage,
  title,
  subtitle,
  placeholder,
  closeButtonText,
  saveButtonText,
}) => {
  const [message, setMessage] = useState("");


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-4">{subtitle}</p>
        <textarea
          className="border rounded-md p-2 w-full mb-4 text-black"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="flex justify-between">
          <Button onClick={closePopup} variant="outline">
            {closeButtonText}
          </Button>
          <Button onClick={() => {
            saveMessage()
            closePopup()
          }}>{saveButtonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default PopupWithInput;
