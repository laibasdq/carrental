import { Link, NavLink } from "react-router-dom";
import { Car, Menu, X, GitCompare, ArrowRight } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Cars",
      path: "/cars",
    },
    {
      name: "My Bookings",
      path: "/my-bookings",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071c1a] text-white shadow-md transition duration-300 group-hover:bg-emerald-700">
            <Car size={22} />
          </div>

          <div>
            <p className="text-xl font-extrabold tracking-tight text-slate-900">
              Drive<span className="text-emerald-700">Easy</span>
            </p>

            <p className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:block">
              Rent. Drive. Explore.
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-emerald-700"
                    : "text-slate-600 hover:text-emerald-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-emerald-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/compare"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <GitCompare size={17} />
            Compare
          </Link>

          <Link
            to="/cars"
            className="group flex items-center gap-2 rounded-xl bg-[#071c1a] px-5 py-3 text-sm font-bold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg"
          >
            Find a car

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <Link
                to="/compare"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <GitCompare size={17} />
                Compare
              </Link>

              <Link
                to="/cars"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#071c1a] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Find a car
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;