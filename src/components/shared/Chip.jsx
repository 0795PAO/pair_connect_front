const Chip = ({item}) => {
    return (
        <li
            key={index}
            className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform"
        >
            {item}
        </li>
    )
}
export default Chip