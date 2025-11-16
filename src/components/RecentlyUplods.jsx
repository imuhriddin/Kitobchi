import { Box, Button } from "@mui/joy";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BookCard from "./BookCard";

function RecentlyUploads() { // Eslatma: function nomida typo tuzatildi
  const { data: books, isPending, error } = useFetch(
    "https://685555ac6a6ef0ed66322ac3.mockapi.io/products"
  );

  return (
    <section className="py-10 bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1250px] px-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1E1B4B]">
            Yaqinda qo'yilgan kitoblar
          </h1>
          <NavLink to="/books">
            <Button variant="solid" color="primary">
              More Books
            </Button>
          </NavLink>
        </div>

        {/* Loading & Error */}
        {isPending && <h2>Loading...</h2>}
        {error && <h2 className="text-red-500">{error}</h2>}

        {/* Book Grid */}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // mobil
              sm: "repeat(2, 1fr)", // kichik ekran
              md: "repeat(3, 1fr)", // o'rta ekran
              lg: "repeat(4, 1fr)", // katta ekran
              xl: "repeat(5, 1fr)", // extra katta ekran
            },
          }}
        >
          {books &&
            books.map((item) => <BookCard key={item.id} item={item} />)}
        </Box>
      </div>
    </section>
  );
}

export default RecentlyUploads;
