import BreadCrumbs from '../components/BreadCrumbs'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <>
      <Navbar />
      {/* <BreadCrumbs /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout