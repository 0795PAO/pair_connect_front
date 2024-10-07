/* eslint-disable react/prop-types */
const Chip = ({item}) => {
    return (
        <li className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform">
            {item}
        </li>
    )
}
export default Chip