import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          404 Error
        </p>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}