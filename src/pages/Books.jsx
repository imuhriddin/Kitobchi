import Search from "antd/es/input/Search"
import useFetch from "../hooks/useFetch";
import BookCard from "../components/BookCard";

function Books() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const { data: books, isPending, error } = useFetch("https://685555ac6a6ef0ed66322ac3.mockapi.io/products");
  console.log("booksdagi kitoblar", books);
  return (
    <div className="mx-auto max-w-[1220px] px-5 flex justify-between border border-red-500 py-10">
      <div className="book-filter w-[25%] border ">
        <h3>Filter</h3>
      </div>
      <div className="books w-[75%]">
        <div className="border px-10 py-3 flex justify-between items-end">
          <div>
            <h3 className="text-[1.4rem] font-bold text-[#1E1B4B]">Kitoblar</h3>
            <p className="text-emerald-600 font-semibold"><span>5 467</span> ta mahsulot sotuvda bor</p>
          </div>
          {/* <input type="text" placeholder="kitob qidirish" /> */}
          <Search style={{ outline: "none", maxWidth: '400px' }} allowClear placeholder="Kitob qidirish" onSearch={onSearch} enterButton />
        </div>
        <div className="border p-10">
          {isPending && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
          <div className="border border-red-500 ">
            {books && books.map((book) => {
              return (
                <BookCard item={book} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books