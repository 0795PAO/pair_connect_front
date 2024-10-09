/* eslint-disable react/prop-types */
const Chip = ({ item }) => {
    return (
        <li className=" text-black py-2 px-4 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] font-semibold shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
            {item}
        </li>
    )
}
export default Chip