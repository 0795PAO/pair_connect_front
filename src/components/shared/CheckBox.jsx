import { Checkbox } from "../ui/checkbox";

/* eslint-disable react/prop-types */
const CheckBox = ({ label, checked, onChange }) => {
    return (
        <div className="flex items-center gap-1">
            <Checkbox
                name={label}
                checked={checked}
                onCheckedChange={() => onChange()}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}
export default CheckBox



