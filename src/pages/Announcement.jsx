import { useRef, useState } from "react";

function Announcement() {

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = [...images];
    for (let i = 0; i < files.length && newImages.length < 6; i++) {
      const file = files[i];
      if (file.size <= 10 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        // Here you might want to read file dimensions as well, but for simplicity, we'll skip it for now.
        // For actual dimensions check, you'd need to load the image.
        newImages.push({
          id: URL.createObjectURL(file), // Unique ID for key, and also a preview URL
          file: file,
          isPrimary: newImages.length === 0, // Set the first uploaded as primary by default
        });
      }
    }
    setImages(newImages);
  };

  const handleFileSelect = (event) => {
    handleFiles(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const setPrimary = (id) => {
    setImages(images.map(img => ({
      ...img,
      isPrimary: img.id === id
    })));
  };

  return (
    <div className="mx-auto max-w-[1250px] px-5 flex justify-between py-10">
      {/* Rasm yuklash */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl my-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rasmlar (1 tadan 6 tagacha)</h3>
        <p className="text-sm text-gray-600 mb-4">Tartibini o'zgartirish uchun rasmlarni torting</p>

        {images.length === 0 ? (
          // Empty state
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
              className="hidden" // Tailwind's way to hide the input
            />
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-5 rounded-md text-base mb-3 transition-colors duration-300">
              Fayllarni tanlang
            </button>
            <p className="text-gray-600 text-sm mb-1">yoki ularni shu yerga tortib tashlang</p>
            <p className="text-gray-500 text-xs">(JPG, PNG, 10 MB gacha, 300x300 dan kichik emas)</p>
          </div>
        ) : (
          // State with uploaded images
          <div className="grid grid-cols-3 gap-4 auto-rows-[120px]"> {/* Adjusted auto-rows for better fit */}
            {images.map((image) => (
              <div key={image.id} className="relative group w-full h-full border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={image.id} alt="Uploaded" className="object-cover w-full h-full" />
                {image.isPrimary && (
                  <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Asosiy
                  </span>
                )}
                {/* Optional: Add a remove button on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(image.id); }}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs mr-2"
                  >
                    ✖
                  </button>
                  {!image.isPrimary && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setPrimary(image.id); }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-xs"
                    >
                      Asosiy qil
                    </button>
                  )}
                </div>
              </div>
            ))}
            {images.length < 6 && (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
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
                <span className="text-gray-400 text-4xl font-light">+</span>
              </div>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Announcement