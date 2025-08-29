import Search from "antd/es/input/Search"
import useFetch from "../hooks/useFetch";
import BookCard from "../components/BookCard";
import { KeyboardArrowDownOutlined, KeyboardArrowRightOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Button, Checkbox, InputNumber, Slider } from "antd";
import { useState } from "react";

function Books() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const { data: books, isPending, error } = useFetch("https://685555ac6a6ef0ed66322ac3.mockapi.io/products");
  console.log("booksdagi kitoblar", books);

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [publisherOpen, setPublisherOpen] = useState(false)
  const [range, setRange] = useState([0, 200000]);

  const onChangeValue = (priceValue) => {
    setRange(priceValue);
  }


  const categories = [
    "Badiiy adabiyot",
    "Ilmiy-ommabop",
    "Tarix",
    "Biografiya",
    "Psixologiya",
    "Biznes va Menejment",
    "Texnologiya va IT",
    "Diniy adabiyot",
    "She’riyat",
    "Bolalar adabiyoti",
    "Detektiv",
    "Fantastika",
    "Sog‘liq va Sport",
    "Madaniyat va San’at",
    "Til o‘rganish"
  ];

  const publishers = [
    "Asaxiy books",
    "Gipatiya",
    "Mashxur press",
    "Nihol nashr",
    "Hilol nashr",
    "Boshqa nashriyotlar",
  ]

  return (
    <div className="mx-auto max-w-[1250px] px-5 flex justify-between py-10">
      <div className="book-filter h-[1000px] w-[20%] bg-[#EEF2FF] rounded-2xl py-3 ">
        <h3 className="text-[1.4rem] font-bold pb-9 pl-3 text-[#1E1B4B]">Filtrni sozlang</h3>

        <div>
          <div onClick={() => setCategoriesOpen(!categoriesOpen)} className="flex border-t justify-between py-2 px-3 cursor-pointer hover:bg-[#EEF2FF]">
            <h4 className="text-[1.1rem] font-bold text-[#1E1B4B]">Bo'limlar</h4>
            <span>
              {categoriesOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
            </span>
          </div>
          {categoriesOpen && (
            <div className=" pl-4 h-70 overflow-y-auto">
              {categories && categories.map(category => (
                <div className="pt-1"><Checkbox >{category}</Checkbox></div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div onClick={() => setPriceOpen(!priceOpen)} className="flex border-t justify-between py-2 px-3 cursor-pointer hover:bg-[#EEF2FF]">
            <h4 className="text-[1.1rem] font-bold text-[#1E1B4B]">Narxi</h4>
            <span>
              {priceOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
            </span>
          </div>
          {priceOpen && (
            <div className="pl-4 h-70 overflow-y-auto ">
              <div className="flex items-start gap-5 mb-5">
                <div className="flex flex-col">
                  <span>Dan</span>
                  <InputNumber />
                </div>
                <div className="flex flex-col">
                  <span>Gacha</span>
                  <InputNumber />
                </div>
              </div>
              <Slider range
                min={0}
                max={1000000}
                value={range}
                onChange={onChangeValue} />
              <Button style={{ width: '90%' }} type="primary">Ok</Button>
            </div>
          )}
        </div>

        <div>
          <div onClick={() => setPublisherOpen(!publisherOpen)} className="flex border-t justify-between py-2 px-3 cursor-pointer hover:bg-[#EEF2FF]">
            <h4 className="text-[1.1rem] font-bold text-[#1E1B4B]">Nashriyotlar</h4>
            <span>
              {publisherOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
            </span>
          </div>
          {publisherOpen && (
            <div className=" pl-4 h-70 overflow-y-auto">
              {publishers && publishers.map(publisher => (
                <div className="pt-1"><Checkbox >{publisher}</Checkbox></div>
              ))}
            </div>
          )}
        </div>




      </div>
      <div className="w-[80%]">
        <div className="pl-5 py-3 flex justify-between items-end">
          <div>
            <h3 className="text-[1.4rem] font-bold text-[#1E1B4B]">Kitoblar</h3>
            <p className="text-emerald-600 font-semibold"><span>5 467</span> ta mahsulot sotuvda bor</p>
          </div>
          {/* <input type="text" placeholder="kitob qidirish" /> */}
          <Search style={{ outline: "none", maxWidth: '400px' }} allowClear placeholder="Kitob qidirish" onSearch={onSearch} enterButton />
        </div>
        <div className="pl-5">
          {isPending && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
          <div className="py-5 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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