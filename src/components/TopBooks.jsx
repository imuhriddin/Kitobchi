import { Box } from '@mui/joy';
import useFetch from '../hooks/useFetch'
import BookCard from './BookCard';

function TopBooks() {
    const { data: books, isPending, error } = useFetch("https://685555ac6a6ef0ed66322ac3.mockapi.io/products");

    return (
        <section className=''>
            <div className='mx-auto max-w-[1220px] px-5 my-10'>
                <h1 className='title py-10'>Best seller kitoblar</h1>
                {isPending && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        py: 1,
                        overflow: 'auto',

                        scrollSnapType: 'x mandatory',
                        '& > *': {
                            scrollSnapAlign: 'center',
                        },
                        '::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {books && books.map((item) => {
                        return (
                            <BookCard key={item.title} item={item} />
                        )
                    })}
                </Box>
            </div>
        </section>
    )
}

export default TopBooks