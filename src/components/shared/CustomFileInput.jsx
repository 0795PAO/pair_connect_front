import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Camera, ImageIcon } from "lucide-react"; 

const CustomFileInput = ({ field, accept, multiple, placeholder }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    field.onChange(e);

    // Update the displayed value
    if (files.length > 0) {
      const fileNames = Array.from(files).map((file) => file.name).join(", ");
      field.onChange(fileNames);
    } else {
      field.onChange("");
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
        value={field.value || ""}
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