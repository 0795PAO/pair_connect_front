/* eslint-disable react/prop-types */
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxChip = ({ label, checked, onChange }) => {
    return (
        <div
            onClick={onChange}
            className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-300 ease-in-out
            hover:bg-primaryHover
            ${!checked ? "bg-primary text-primary-foreground" : "bg-primaryHover"}
            `}
        >
            <label>{label}</label>
            <Checkbox
                    checked={checked}
                    onCheckedChange={() => { }}
                    className="hidden"
                />
        </div>
    );
};

export default CheckboxChip;