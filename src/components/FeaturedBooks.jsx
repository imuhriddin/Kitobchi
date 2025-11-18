import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const featuredBooks = [
    {
        id: 1,
        title: "Alkimyogar",
        author: "Paulo Coelho",
        price: "35 000 so'm",
        location: "Toshkent, Chilonzor",
        img: "https://arm.samdchti-al.uz/products/2021-06-20/60cf3ea10ba43.jpg",
    },
    {
        id: 2,
        title: "Ufq",
        author: "O'tkir Hoshimov",
        price: "40 000 so'm",
        location: "Samarqand, Bulung'ur",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBiom6E9IsK9ww4nTTsEKDGehK-jh0SlFFNMzPdw0pDpIqcZ_75rVB-ap51qwH7w33kU&usqp=CAU",
    },
    {
        id: 3,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: "45 000 so'm",
        location: "Farg‘ona, Marg‘ilon",
        img: "https://www.thebookbundle.com/cdn/shop/files/s-l1600_7244eb59-5596-4198-b06e-c1f4caa499fa_700x700.jpg?v=1696509943",
    },
    {
        id: 4,
        title: "Sariq devni minib",
        author: "Xudoyberdi To‘xtaboyev",
        price: "25 000 so'm",
        location: "Namangan, Chust",
        img: "https://frankfurt.apollo.olxcdn.com/v1/files/y21s2hxywztk2-UZ/image;s=1500x2000",
    },
];

export default function FeaturedBooks() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-[1220px] mx-auto px-5">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
                    Tavsiya etilgan kitoblar
                </h2>

                <p className="text-center text-gray-600 mt-3">
                    Eng ko‘p ko‘rilgan va mashhur kitoblar
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-14">
                    {featuredBooks.map((book) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 border border-gray-100"
                        >
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={book.img}
                                    alt={book.title}
                                    className="w-full h-56 object-cover transform hover:scale-105 transition-all duration-300"
                                />
                            </div>

                            <h3 className="text-lg font-semibold mt-4 text-gray-900">
                                {book.title}
                            </h3>

                            <p className="text-sm text-gray-600">{book.author}</p>

                            {/* Location */}
                            <div className="flex items-center gap-1 text-indigo-600 text-sm font-medium mt-2">
                                <MapPin size={18} />
                                <span>{book.location}</span>
                            </div>

                            <p className="mt-2 text-indigo-600 font-bold">{book.price}</p>

                            <Link
                                to={`/books/${book.id}`}
                                className="block text-center mt-4 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
                            >
                                Ko‘rish
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
