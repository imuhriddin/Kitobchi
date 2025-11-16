import { NavLink } from "react-router";
import Searching from "../components/Searching";
import RecentlyUplods from "../components/RecentlyUplods";
import TopBooks from "../components/TopBooks";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-indigo-100 to-indigo-50 overflow-hidden py-20 md:py-32">
        {/* Decorative Shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-indigo-200 rounded-full opacity-40 blur-2xl animate-pulse"></div>

        <div className="max-w-[1220px] mx-auto px-5 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-indigo-700 leading-snug drop-shadow-md"
            >
              Kitob sotib oling, ijaraga oling va oson soting
            </motion.h1>

            <p className="text-lg md:text-xl text-gray-700 mt-6 max-w-2xl">
              <span className="font-bold text-indigo-900">Kitobchi</span> —
              kitoblarni oldi-berdi qilishni osonlashtiradi. O'zingizga yoqqan
              kitobni toping yoki sotib yuboring!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-10">
              <NavLink
                to="/books"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Kitob olish
              </NavLink>

              <NavLink
                to="/announcement"
                className="px-6 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold shadow-md hover:bg-indigo-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                Kitob sotish
              </NavLink>

              <NavLink
                to="/announcement"
                className="px-6 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold shadow-md hover:bg-indigo-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                Ijaraga berish
              </NavLink>
            </div>

            {/* Search Component */}
            <div className="mt-12 w-full max-w-xl">
              <Searching />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="max-w-[1220px] mx-auto px-5 py-16 space-y-16">
        <RecentlyUplods />
        <TopBooks />
      </section>
    </>
  );
}
