import { Link, NavLink } from "react-router"

function Navbar() {
  return (
    <header className="bg-[#E4E4E7]">
      <div className="mx-auto max-w-[1250px] px-5 py-3 flex items-center justify-between">
        <Link to={'/'}>
          <h1 className="text-3xl font-bold text-[#1E1B4B]">Kitobchi</h1>
        </Link>
        <nav className="flex items-center gap-4 main-font ">
          <NavLink to={'/'} className={"hover-action isActive"}>Bosh sahifa</NavLink>
          <NavLink to={'/books'} className={"hover-action isActive"}>Kitoblar</NavLink>
          <NavLink to={'/announcement'} className={"hover-action"}>Elon berish</NavLink>
          <NavLink to={'/cart'} className={"hover-action"}>Savatcha</NavLink>
          <NavLink to={'/profile'} className={"btn-hover btn"}>Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar