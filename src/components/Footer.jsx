import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Car } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "f",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "ig",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: "x",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "in",
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#071c1a] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-10">
        {/* BRAND */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
              <Car size={21} />
            </span>

            <span className="text-2xl font-extrabold tracking-tight">
              Drive<span className="text-emerald-400">Easy</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Simple, reliable, and comfortable car rental for
            everyday journeys, business trips, and weekend
            adventures.
          </p>

          {/* SOCIAL */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-xs font-bold text-slate-300 transition hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-base font-bold text-white">
            Quick Links
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-y-3">
            <Link
              to="/"
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              Home
            </Link>

            <Link
              to="/cars"
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              Cars
            </Link>

            <Link
              to="/compare"
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              Compare
            </Link>

            <Link
              to="/my-bookings"
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              My Bookings
            </Link>

            <Link
              to="/about"
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-base font-bold text-white">
            Get in touch
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Mail size={17} />
              </span>

              <div>
                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  support@driveeasy.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Phone size={17} />
              </span>

              <div>
                <p className="text-xs text-slate-500">
                  Phone
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  +92 300 1234567
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <MapPin size={17} />
              </span>

              <div>
                <p className="text-xs text-slate-500">
                  Location
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  Islamabad, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-10">
          <p>
            © {new Date().getFullYear()} DriveEasy. All rights
            reserved.
          </p>

          <p>Drive smarter. Travel easier.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;