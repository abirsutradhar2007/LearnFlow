import { Link, NavLink } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const { user, isLoading, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Materials", path: "/videos", requiresAuth: true },
    { name: "Profile", path: "/profile", requiresAuth: true },
    { name: "Contact us", path: "/contact", requiresAuth: true },
  ];
  const visibleNavLinks = navLinks.filter(
    (link) => !link.requiresAuth || (!isLoading && user)
  );

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await logout();
      setLogoutDialogOpen(false);
      setMenuOpen(false);
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  const openLogoutDialog = () => {
    setLogoutError("");
    setMenuOpen(false);
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
    setLogoutError("");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#FFFDF2]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-[#201F1A]">Learn</span>
          <span className="text-[#77746A]">Flow.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {visibleNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#201F1A]"
                    : "text-[#68665E] hover:text-black"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {!isLoading &&
            (user ? (
              <>
                
                <button
                  type="button"
                  onClick={openLogoutDialog}
                  className="text-sm font-medium text-[#68665E] transition-colors hover:text-black"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-[#68665E] transition-colors hover:text-black"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-[#201F1A] px-4 py-2 text-sm font-medium text-[#FFFDF2] transition hover:bg-black/80"
                >
                  Sign up
                </NavLink>
              </>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#201F1A] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <List size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="flex flex-col gap-5 border-t border-black/10 bg-[#FFFDF2] px-6 py-6 md:hidden">
          {visibleNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-[#201F1A]" : "text-[#68665E]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {!isLoading &&
            (user ? (
              <>
                <button
                  type="button"
                  onClick={openLogoutDialog}
                  className="text-left text-sm font-medium text-[#68665E]"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[#68665E]"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[#201F1A]"
                >
                  Sign up
                </NavLink>
              </>
            ))}
        </div>
      )}
      {logoutDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            className="w-full max-w-sm border border-black/10 bg-[#FFFDF2] p-6 shadow-xl"
          >
            <h2 id="logout-dialog-title" className="text-lg font-semibold">
              Log out?
            </h2>
            <p
              id="logout-dialog-description"
              className="mt-2 text-sm text-[#68665E]"
            >
              Are you sure you want to log out of your account?
            </p>
            {logoutError && (
              <p role="alert" className="mt-3 text-sm text-red-800">
                {logoutError}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeLogoutDialog}
                className="border border-black/15 px-4 py-2 text-sm font-medium text-[#201F1A] transition hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-[#E65B4F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D94F44]"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;