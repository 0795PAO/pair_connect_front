/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

const CustomFileInput = ({ field, accept, multiple, placeholder }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
      field.onChange(files);
      if (files.length > 0) {

      const selectedFileName = Array.from(files).map((file) => file.name).join(", ");
      setFileName(selectedFileName);
    } else {
    setFileName("");
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