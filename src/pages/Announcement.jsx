import { useEffect, useRef, useState } from "react";

function Announcement({ apiData }) {

  // ======== FORM HOLATLARI =========
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // ======== RASM HOLATI =========
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // ================================
  // 1) API dan kelgan ma’lumotlarni yuklash
  // ================================
  useEffect(() => {
    if (apiData) {
      setTitle(apiData.title);
      setAuthor(apiData.author);
      setCategory(apiData.category);
      setPrice(apiData.price);
      setDescription(apiData.description);

      if (apiData.images) {
        const apiImages = apiData.images.map((url, i) => ({
          id: url,
          file: null,
          isPrimary: i === 0,
        }));
        setImages(apiImages);
      }
    }
  }, [apiData]);

  // ================================
  // 2) Rasm yuklash
  // ================================
  const handleFiles = (files) => {
    const newImages = [...images];
    for (let i = 0; i < files.length && newImages.length < 6; i++) {
      const file = files[i];

      if (
        file.size <= 10 * 1024 * 1024 &&
        ["image/jpeg", "image/png"].includes(file.type)
      ) {
        newImages.push({
          id: URL.createObjectURL(file),
          file: file,
          isPrimary: newImages.length === 0,
        });
      }
    }
    setImages(newImages);
  };

  const handleFileSelect = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeImage = (id) => setImages(images.filter((img) => img.id !== id));

  const setPrimary = (id) => {
    setImages(images.map((img) => ({ ...img, isPrimary: img.id === id })));
  };

  // ================================
  // 3) YUBORISH
  // ================================
  const handleSubmit = () => {
    const payload = {
      title,
      author,
      category,
      price,
      description,
      images,
    };

    console.log("Yuborilayotgan ma’lumot:", payload);
  };

  return (
    <div className="mx-auto max-w-[1250px] px-5 py-10">

      {/* ===================================== */}
      {/* RASMLAR BLOKI */}
      {/* ===================================== */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full my-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rasmlar</h3>
        <p className="text-sm text-gray-600 mb-4">1 tadan 6 tagacha</p>

        {images.length === 0 ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />

            <button className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-5 rounded-md text-base mb-3">
              Fayllarni tanlang
            </button>

            <p className="text-gray-600 text-sm mb-1">yoki tortib tashlang</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 auto-rows-[120px]">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group w-full h-full border border-gray-200 rounded-lg overflow-hidden"
              >
                <img src={image.id} className="object-cover w-full h-full" />

                {image.isPrimary && (
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    Asosiy
                  </span>
                )}

                {image.file === null && (
                  <span className="absolute bottom-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded">
                    API
                  </span>
                )}

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => removeImage(image.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2"
                  >
                    ✖
                  </button>
                  {!image.isPrimary && (
                    <button
                      onClick={() => setPrimary(image.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Asosiy
                    </button>
                  )}
                </div>
              </div>
            ))}

            {images.length < 6 && (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/jpeg, image/png"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <span className="text-gray-400 text-4xl">+</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===================================== */}
      {/* KITOB MA’LUMOTLARI FORMASI */}
      {/* ===================================== */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full my-5">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Kitob ma’lumotlari</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
          placeholder="Kitob nomi"
          type="text"
        />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
          placeholder="Muallif"
          type="text"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
          placeholder="Kategoriya"
          type="text"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
          placeholder="Narx"
          type="number"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
          placeholder="Tavsif"
          rows="4"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-3"
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}

export default Announcement;
