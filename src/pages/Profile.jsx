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
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
          password: "", // parol bo‘sh bo‘ladi, foydalanuvchi kiritadi
          phone: res.data.phone || "",
          telegram_username: res.data.telegram_username || "",
          avatar_url: res.data.avatar_url || "",
          bio: res.data.bio || "",
          gender: res.data.gender || "",
        });
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setUpdating(true);
    setMessage("");
    try {
      // PUT /users/me endpointiga yangilangan ma'lumotlarni yuboramiz
      await api.put("/users/me", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser({ ...user, ...form }); // display-ni update qilamiz
      setEditing(false);
      setMessage("Profil muvaffaqiyatli yangilandi!");
    } catch (err) {
      console.log(err);
      setMessage("Yangilashda xatolik yuz berdi.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <div className="text-center mt-20">Yuklanmoqda...</div>;

  return (
    <div className="mx-auto max-w-[800px] px-5 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {form.avatar_url ? (
            <img
              src={form.avatar_url}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
              {user.first_name?.[0] || "U"}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 w-full">
          {!editing ? (
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Ism:</span> {user.first_name}
              </p>
              <p>
                <span className="font-semibold">Familiya:</span> {user.last_name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Telefon:</span> {user.phone || "-"}
              </p>
              <p>
                <span className="font-semibold">Telegram:</span> {user.telegram_username || "-"}
              </p>
              {user.bio && (
                <p>
                  <span className="font-semibold">Bio:</span> {user.bio}
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Ism"
                  className="mt-1 w-full rounded-lg border p-2"
                />
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Familiya"
                  className="mt-1 w-full rounded-lg border p-2"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="mt-1 w-full rounded-lg border p-2"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Parol (yangilash uchun)"
                  className="mt-1 w-full rounded-lg border p-2"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Telefon"
                  className="mt-1 w-full rounded-lg border p-2"
                />
                <input
                  type="text"
                  name="telegram_username"
                  value={form.telegram_username}
                  onChange={handleChange}
                  placeholder="Telegram username"
                  className="mt-1 w-full rounded-lg border p-2"
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2"
                >
                  <option value="">Jinsni tanlang</option>
                  <option value="male">Erkak</option>
                  <option value="female">Ayol</option>
                </select>
                <input
                  type="text"
                  name="avatar_url"
                  value={form.avatar_url}
                  onChange={handleChange}
                  placeholder="Avatar URL"
                  className="mt-1 w-full rounded-lg border p-2"
                />
              </div>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="mt-1 w-full rounded-lg border p-2"
                rows="3"
              ></textarea>

              {message && <p className="text-green-600">{message}</p>}

              <div className="flex gap-4 mt-2">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {updating ? "Yangilanmoqda..." : "Saqlash"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          )}

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="mt-4 py-2 px-4 mx-5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Yangilash
            </button>
          )}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="mt-2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
