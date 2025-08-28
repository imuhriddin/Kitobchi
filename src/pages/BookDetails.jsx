import React from 'react'
import { useParams } from 'react-router';

const dummyBook = {
    id: 1,
    title: "Qiziqarli kitoblar",
    price: 50000,
    condition: "Ishlatilgan",
    category: "Xobbi va sport / Kitoblar / jurnallar",
    description: "Qiziqarli kitoblar, o‘qilgan, arzon narxlarda beryapman",
    location: "O‘zbekiston, Toshkent viloyati, Olmaliq, Mustaqillik ko‘chasi",
    images: [
        "https://picsum.photos/300/400",
        "https://picsum.photos/301/400",
        "https://picsum.photos/302/400",
    ],
    seller: {
        name: "Nodira",
        memberSince: "21.07.2025",
        idVerified: true,
        avatar: "https://i.pravatar.cc/100",
    },
};

const BookDetails = () => {
    const { id } = useParams();
    const book = dummyBook;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rasmlar */}
                <div>
                    <img
                        src={book.images[0]}
                        alt={book.title}
                        className="rounded-lg shadow-md w-full h-[350px] object-cover"
                    />
                    <div className="flex gap-2 mt-3">
                        {book.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`preview-${idx}`}
                                className="w-20 h-20 rounded-md object-cover border hover:ring-2 hover:ring-blue-500 cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* Kitob haqida */}
                <div>
                    <h1 className="text-2xl font-bold">{book.title}</h1>
                    <p className="text-pink-600 font-bold text-xl mt-2">
                        {book.price.toLocaleString()} so‘m
                    </p>
                    <p className="text-gray-500">{book.condition}</p>

                    <div className="flex gap-4 mt-4">
                        <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                            Telefon
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Telegram
                        </button>
                    </div>

                    {/* Sotuvchi haqida */}
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex items-center gap-4">
                        <img
                            src={book.seller.avatar}
                            alt={book.seller.name}
                            className="w-14 h-14 rounded-full border"
                        />
                        <div>
                            <h3 className="font-semibold">{book.seller.name}</h3>
                            <p className="text-sm text-gray-500">
                                Platformada: {book.seller.memberSince}
                            </p>
                            {book.seller.idVerified && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                    ID tasdiqlangan
                                </span>
                            )}
                        </div>
                        <button className="ml-auto bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                            Obuna bo‘lish
                        </button>
                    </div>
                </div>
            </div>

            {/* Xususiyatlar */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-3">Xususiyatlar</h2>
                <p>
                    <span className="font-semibold">Toifa:</span> {book.category}
                </p>
                <p>
                    <span className="font-semibold">Holat:</span> {book.condition}
                </p>
            </div>

            {/* Tavsif */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-2">Tavsif</h2>
                <p className="text-gray-700">{book.description}</p>
            </div>

            {/* Bitim joyi */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-2">Bitim joyi</h2>
                <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-gray-700">{book.location}</p>
                    <div className="mt-2">
                        <img
                            src="https://maps.googleapis.com/maps/api/staticmap?center=Olmaliq&zoom=13&size=600x300&key=YOUR_API_KEY"
                            alt="map"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails