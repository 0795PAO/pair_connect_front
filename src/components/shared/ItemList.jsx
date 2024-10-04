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
          <li
            key={index}
            className="py-1 px-3 rounded-full text-black font-bold shadow-lg hover-shadow-custom bg-gradient-to-r from-primary to-secondary transform"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
