import Chip from "./Chip";

/* eslint-disable react/prop-types */
const ItemList = ({ items = [], title = "Items" }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <p className="mb-4 lg:mb-6">
        No se han especificado {title.toLowerCase()} para esta sesión.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 lg:mb-6">{title}:</h2>
      <ul className="mb-4 lg:mb-6 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Chip key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
