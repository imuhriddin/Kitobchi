import { Link } from "react-router-dom";

function BookCard({ item }) {
  return (
    <Link
      to={`/books/${item.id}`}
      className="relative flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 w-52 sm:w-56"
    >
      {/* Delivery Badge */}
      <div className="absolute top-2 left-2">
        <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
          Yetkazib berish
        </span>
      </div>

      {/* Book Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-32 h-44 sm:w-36 sm:h-48 rounded-lg object-cover mb-3 shadow-sm"
      />

      {/* Title, Author, Price */}
      <div className="text-center w-full px-1 mb-3">
        <h3 className="text-sm font-bold text-gray-900 truncate">
          {item.title}
        </h3>
        <p className="text-indigo-600 text-xs mt-0.5 truncate">{item.author}</p>
        <p className="text-indigo-800 font-semibold mt-1 text-sm">
          {item.price} so'm
        </p>

        {/* Rating */}
        <div className="flex justify-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${
                i < Number(String(item.price)[0])
                  ? "text-green-500"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.96c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.072 9.387c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.96z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-indigo-600 text-white font-semibold py-1.5 rounded-lg mt-auto hover:bg-indigo-700 transition-colors text-sm"
        onClick={(e) => e.preventDefault()} // 🤚 Single pagega o‘tishda to‘smaslik uchun
      >
        Add to cart
      </button>
    </Link>
  );
}

export default BookCard;
