import Chip from "./Chip";

/* eslint-disable react/prop-types */
const ItemList = ({ items = [], title = "" }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <p className="mb-4 lg:mb-6">
        No se han especificado {title.toLowerCase()} para esta sesión.
      </p>
    );
  }

  return (

    <ul className="flex flex-wrap gap-4 mt-6">
      {items.map((item, index) => (
        <Chip key={index} item={item} />
      ))}
    </ul>

  );
};

export default ItemList;
