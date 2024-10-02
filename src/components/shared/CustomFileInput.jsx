/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react"; 

const CustomFileInput = ({ field, accept, multiple, placeholder }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(""); // Local state to track file name

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;

    field.onChange(files); // Pass the file data to React Hook Form

    if (files.length > 0) {
      // Update the displayed file name
      const selectedFileName = Array.from(files).map((file) => file.name).join(", ");
      setFileName(selectedFileName); // Set the local state with the file name
    } else {
      setFileName(""); // Clear the file name if no file is selected
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Input
        type="text"
        readOnly
        onClick={handleClick}
        placeholder={placeholder || "Seleccionar archivo"}
        value={fileName}
        className="cursor-pointer pr-10 w-full"
      />
      <Camera
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
        size={20}
      />
    </div>
  );
};

export default CustomFileInput;