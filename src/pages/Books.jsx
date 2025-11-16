import Search from "antd/es/input/Search";
import useFetch from "../hooks/useFetch";
import BookCard from "../components/BookCard";
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Button, Checkbox, InputNumber, Slider } from "antd";
import { useState } from "react";

function Books() {
  const onSearch = (value) => console.log(value);
  const { data: books, isPending, error } = useFetch("https://685555ac6a6ef0ed66322ac3.mockapi.io/products");

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [publisherOpen, setPublisherOpen] = useState(false);
  const [range, setRange] = useState([0, 200000]);

  const onChangeValue = (priceValue) => setRange(priceValue);

  const categories = ["Badiiy adabiyot", "Ilmiy-ommabop", "Tarix", "Biografiya", "Psixologiya", "Biznes va Menejment", "Texnologiya va IT", "Diniy adabiyot", "She’riyat", "Bolalar adabiyoti", "Detektiv", "Fantastika", "Sog‘liq va Sport", "Madaniyat va San’at", "Til o‘rganish"];
  const publishers = ["Asaxiy books", "Gipatiya", "Mashxur press", "Nihol nashr", "Hilol nashr", "Boshqa nashriyotlar"];

  return (
    <div className="max-w-[1250px] mx-auto px-5 py-10 flex flex-col md:flex-row gap-6">
      {/* FILTER SECTION */}
      <div className="md:w-1/4 bg-[#EEF2FF] rounded-2xl p-5 flex-shrink-0">
        <h3 className="text-xl font-bold text-[#1E1B4B] mb-5">Filtrni sozlang</h3>
        {/* Categories */}
        <div>
          <div onClick={() => setCategoriesOpen(!categoriesOpen)} className="flex justify-between items-center py-2 px-3 border-t cursor-pointer hover:bg-[#E0E0FF]">
            <h4 className="font-semibold text-[#1E1B4B]">Bo'limlar</h4>
            {categoriesOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </div>
          {categoriesOpen && (
            <div className="pl-3 max-h-56 overflow-y-auto">
              {categories.map((cat) => <Checkbox key={cat} className="my-1">{cat}</Checkbox>)}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-4">
          <div onClick={() => setPriceOpen(!priceOpen)} className="flex justify-between items-center py-2 px-3 border-t cursor-pointer hover:bg-[#E0E0FF]">
            <h4 className="font-semibold text-[#1E1B4B]">Narxi</h4>
            {priceOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </div>
          {priceOpen && (
            <div className="pl-3 max-h-56 overflow-y-auto mt-2">
              <div className="flex gap-3 mb-4">
                <div className="flex flex-col">
                  <span>Dan</span>
                  <InputNumber value={range[0]} onChange={(val) => onChangeValue([val, range[1]])} />
                </div>
                <div className="flex flex-col">
                  <span>Gacha</span>
                  <InputNumber value={range[1]} onChange={(val) => onChangeValue([range[0], val])} />
                </div>
              </div>
              <Slider range min={0} max={1000000} value={range} onChange={onChangeValue} className="mb-3" />
              <Button type="primary" block>Ok</Button>
            </div>
          )}
        </div>

        {/* Publishers */}
        <div className="mt-4">
          <div onClick={() => setPublisherOpen(!publisherOpen)} className="flex justify-between items-center py-2 px-3 border-t cursor-pointer hover:bg-[#E0E0FF]">
            <h4 className="font-semibold text-[#1E1B4B]">Nashriyotlar</h4>
            {publisherOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </div>
          {publisherOpen && (
            <div className="pl-3 max-h-56 overflow-y-auto mt-2">
              {publishers.map((pub) => <Checkbox key={pub} className="my-1">{pub}</Checkbox>)}
            </div>
          )}
        </div>
      </div>

      {/* BOOKS SECTION */}
      <div className="md:w-3/4 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h3 className="text-xl font-bold text-[#1E1B4B]">Kitoblar</h3>
            <p className="text-emerald-600 font-semibold"><span>5 467</span> ta mahsulot sotuvda bor</p>
          </div>
          <Search allowClear placeholder="Kitob qidirish" onSearch={onSearch} enterButton className="max-w-xs w-full mt-3 md:mt-0" />
        </div>

        {isPending && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books && books.map((book) => <BookCard key={book.id} item={book} />)}
        </div>
      </div>
    </div>
  );
}

export default Books;