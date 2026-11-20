import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollTop.jsx";
function Layout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isLandingPage = pathname === "/" && !user;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const showAppChrome = !isLandingPage && !isAuthPage;

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFDF2] text-[#201F1A]">
      <ScrollToTop />
      {showAppChrome && <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      {showAppChrome && <Footer />}

    </div>
  );
}

export default Layout;