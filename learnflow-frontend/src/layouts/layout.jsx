import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollTop.jsx";
function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default Layout;