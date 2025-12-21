import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    telegram_username: "",
    avatar_url: "",
    bio: "",
    gender: "",
  });

  const [myListings, setMyListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ================== USER INFO ==================
  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
          password: "",
          phone: res.data.phone || "",
          telegram_username: res.data.telegram_username || "",
          avatar_url: res.data.avatar_url || "",
          bio: res.data.bio || "",
          gender: res.data.gender || "",
        });
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [navigate]);

  // ================== MY LISTINGS ==================
  useEffect(() => {
    async function fetchMyListings() {
      try {
        const res = await api.get(
          "/users/me/listings?page=1&page_size=10",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setMyListings(res.data.items || res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setListingsLoading(false);
      }
    }

    fetchMyListings();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setUpdating(true);
    setMessage("");

    try {
      await api.put("/users/me", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser({ ...user, ...form });
      setEditing(false);
      setMessage("Profil muvaffaqiyatli yangilandi!");
    } catch (err) {
      setMessage("Yangilashda xatolik yuz berdi.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return <div className="text-center mt-20">Yuklanmoqda...</div>;
  }

  return (
    <div className="mx-auto max-w-[900px] px-5 py-10">
      {/* ================== PROFILE CARD ================== */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div>
          {form.avatar_url ? (
            <img
              src={form.avatar_url}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              {user.first_name?.[0] || "U"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          {!editing ? (
            <div className="space-y-2">
              <p><b>Ism:</b> {user.first_name}</p>
              <p><b>Familiya:</b> {user.last_name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Telefon:</b> {user.phone || "-"}</p>
              <p><b>Telegram:</b> {user.telegram_username || "-"}</p>
              {user.bio && <p><b>Bio:</b> {user.bio}</p>}
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-3">
              <input name="first_name" value={form.first_name} onChange={handleChange} className="border p-2 w-full" placeholder="Ism" />
              <input name="last_name" value={form.last_name} onChange={handleChange} className="border p-2 w-full" placeholder="Familiya" />
              <input name="email" value={form.email} onChange={handleChange} className="border p-2 w-full" placeholder="Email" />
              <input name="password" value={form.password} onChange={handleChange} className="border p-2 w-full" placeholder="Yangi parol" />
              <textarea name="bio" value={form.bio} onChange={handleChange} className="border p-2 w-full" placeholder="Bio" />

              {message && <p className="text-green-600">{message}</p>}

              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Saqlash
              </button>
            </form>
          )}

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Yangilash
            </button>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="ml-3 bg-red-500 text-white px-4 py-2 rounded"
          >
            Chiqish
          </button>
        </div>
      </div>

      {/* ================== MY BOOKS ================== */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">📚 Mening kitoblarim</h2>

        {listingsLoading ? (
          <p>Yuklanmoqda...</p>
        ) : myListings.length === 0 ? (
          <p className="text-gray-500">Siz hali kitob joylamagansiz.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myListings.map((book) => (
              <div
                key={book.id}
                className="border rounded-xl p-4 hover:shadow-md transition"
              >
                {book.images?.[0] && (
                  <img
                    src={book.images[0]}
                    alt={book.title}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                )}

                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex justify-between mt-2">
                  <span className="font-bold text-blue-600">
                    {book.price} so‘m
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {book.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
