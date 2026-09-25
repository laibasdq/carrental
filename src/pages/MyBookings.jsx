import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Car,
  MapPin,
  Search,
  Eye,
  Pencil,
  XCircle,
} from "lucide-react";

import { getBookings, saveBookings } from "../lib/bookings";

const statusOptions = [
  "All",
  "Upcoming",
  "Active",
  "Completed",
  "Cancelled",
];

function MyBookings() {
  // Lazy initializer reads localStorage once on first render instead of
  // via useEffect + setState, avoiding an extra cascading render.
  const [bookings, setBookings] = useState(() => getBookings());
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        String(booking.id || "")
          .toLowerCase()
          .includes(searchText) ||
        String(booking.car || "")
          .toLowerCase()
          .includes(searchText) ||
        String(booking.pickupLocation || "")
          .toLowerCase()
          .includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, search]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-emerald-100 text-emerald-700";

      case "Active":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-slate-100 text-slate-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const handleModify = (booking) => {
    alert(
      `Modify booking ${booking.id} is currently a demo feature.`
    );
  };

  const handleCancel = (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    const updated = bookings.map((booking) =>
      booking.id === bookingId
        ? {
            ...booking,
            status: "Cancelled",
          }
        : booking
    );

    setBookings(updated);
    saveBookings(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
            DriveEasy
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            My Bookings
          </h1>

          <p className="mt-2 text-slate-600">
            View and manage your car rental bookings.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search booking, car or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    statusFilter === status
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Car size={30} />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              No bookings found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              {bookings.length === 0
                ? "You have not made any bookings yet."
                : "Try changing your search or status filter."}
            </p>

            {bookings.length === 0 && (
              <Link
                to="/cars"
                className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Browse Cars
              </Link>
            )}
          </div>
        )}

        {/* Booking Cards */}
        <div className="space-y-5">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="grid md:grid-cols-[220px_1fr]">

                {/* Image */}
                <div className="h-52 md:h-full">
                  {booking.carImage ? (
                    <img
                      src={booking.carImage}
                      alt={booking.car}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-emerald-50 text-emerald-700">
                      <Car size={40} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 md:p-6">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-xl font-extrabold text-slate-900">
                          {booking.car}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status || "Upcoming"}
                        </span>

                      </div>

                      <p className="mt-1 text-sm font-semibold text-emerald-700">
                        {booking.id}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-slate-900">
                        PKR{" "}
                        {Number(
                          booking.total || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">

                    <div className="flex gap-3">
                      <CalendarDays
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-700"
                      />

                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Dates
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {booking.pickupDate}
                        </p>

                        <p className="text-xs text-slate-500">
                          to {booking.returnDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <MapPin
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-700"
                      />

                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Pickup
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {booking.pickupLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Car
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-700"
                      />

                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Payment
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {booking.payment}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-5">

                    <Link
                      to={`/confirmation?id=${booking.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                    >
                      <Eye size={17} />
                      View Details
                    </Link>

                    {booking.status !== "Cancelled" &&
                      booking.status !== "Completed" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleModify(booking)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            <Pencil size={17} />
                            Modify
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleCancel(booking.id)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                          >
                            <XCircle size={17} />
                            Cancel
                          </button>
                        </>
                      )}

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/cars"
              className="inline-flex rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
            >
              Book Another Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;