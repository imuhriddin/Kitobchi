import { Box, Button } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import BookCard from './BookCard';

function TopBooks() {
    const { data: books, isPending, error } = useFetch(
        "https://685555ac6a6ef0ed66322ac3.mockapi.io/products"
    );

    return (
        <section className="py-10 bg-[#F9FAFB]">
            <div className="mx-auto max-w-[1250px] px-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#1E1B4B]">
                        Best seller kitoblar
                    </h1>
                    <NavLink to="/books">
                        <Button variant="solid" color="primary">
                            More Books
                        </Button>
                    </NavLink>
                </div>

                {/* Loading / Error */}
                {isPending && (
                    <h2 className="text-center text-gray-500 text-lg">Loading...</h2>
                )}
                {error && (
                    <h2 className="text-center text-red-500 text-lg">{error}</h2>
                )}

                {/* Book Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: 'repeat(5, 1fr)', // katta ekranlarda 5 ta karta
                        '@media (max-width:1280px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
                        '@media (max-width:1024px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
                        '@media (max-width:768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
                        '@media (max-width:480px)': { gridTemplateColumns: '1fr' },
                    }}
                >
                    {books &&
                        books.map((item) => (
                            <BookCard key={item.id} item={item} />
                        ))}
                </Box>
            </div>
        </section>
    );
}

export default TopBooks;
