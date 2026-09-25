import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
  ShieldCheck,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";

import cars from "../data/cars";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Compare() {
  useDocumentTitle("Compare Cars");

  const navigate = useNavigate();

  const storedIds = JSON.parse(
    localStorage.getItem("compareCars") || "[]"
  );

  const selectedCars = cars.filter((car) =>
    storedIds.includes(car.id)
  );

  const removeCar = (id) => {
    const updated = storedIds.filter(
      (carId) => carId !== id
    );

    localStorage.setItem(
      "compareCars",
      JSON.stringify(updated)
    );

    window.location.reload();
  };

  const clearAll = () => {
    localStorage.removeItem("compareCars");
    window.location.reload();
  };

  const specs = [
    {
      label: "Category",
      key: "category",
      icon: Gauge,
    },
    {
      label: "Transmission",
      key: "transmission",
      icon: Settings2,
    },
    {
      label: "Fuel Type",
      key: "fuel",
      icon: Fuel,
    },
    {
      label: "Seats",
      key: "seats",
      icon: Users,
    },
    {
      label: "Location",
      key: "location",
      icon: MapPin,
    },
  ];

  if (selectedCars.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#f5f8f7] px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-teal-600">
            <Settings2 size={32} />
          </div>

          <h1 className="mt-7 text-3xl font-black tracking-tight text-gray-950">
            Compare your cars
          </h1>

          <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
            Select up to three vehicles from our fleet to compare
            their price, features, and specifications side by side.
          </p>

          <Link
            to="/cars"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-teal-700"
          >
            Browse Cars
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8f7]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#061b18]">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-100">
                <Settings2 size={14} />
                Vehicle comparison
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
                Compare your
                <span className="text-teal-300"> choices.</span>
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-gray-300">
                Put your selected vehicles side by side and choose
                the one that fits your trip.
              </p>
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMPARISON
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        {/* Selected count */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
              Your selection
            </p>

            <h2 className="mt-1 text-2xl font-black text-gray-950">
              {selectedCars.length} of 3 vehicles
            </h2>
          </div>

          <Link
            to="/cars"
            className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-teal-200 hover:text-teal-700 sm:flex"
          >
            Add another car
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* ===================================================
            CAR CARDS
        =================================================== */}
        <div
          className={`grid gap-5 ${
            selectedCars.length === 1
              ? "max-w-md"
              : selectedCars.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          }`}
        >
          {selectedCars.map((car, index) => (
            <div
              key={car.id}
              className="group overflow-hidden rounded-[1.7rem] border border-gray-100 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-800 backdrop-blur">
                    Option {index + 1}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeCar(car.id)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition hover:bg-red-500"
                  title="Remove car"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {car.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-gray-200">
                      <MapPin size={12} />
                      {car.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-amber-600">
                    <Star
                      size={12}
                      fill="currentColor"
                    />
                    4.9
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-b border-gray-100 p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Daily rental
                </p>

                <p className="mt-1 text-2xl font-black text-gray-950">
                  PKR {car.dailyRate.toLocaleString()}
                  <span className="ml-1 text-xs font-medium text-gray-400">
                    /day
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 p-5">
                <Link
                  to={`/cars/${car.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-xs font-bold text-gray-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                >
                  Details
                </Link>

                <Link
                  to={`/booking/${car.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-3 py-3 text-xs font-bold text-white transition hover:bg-teal-700"
                >
                  Book
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ===================================================
            SPEC TABLE
        =================================================== */}
        <section className="mt-8 overflow-hidden rounded-[1.7rem] border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-xl font-black text-gray-950">
              Vehicle comparison
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Compare the important details before making your
              choice.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="w-48 px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    Feature
                  </th>

                  {selectedCars.map((car) => (
                    <th
                      key={car.id}
                      className="px-6 py-5 text-left"
                    >
                      <div className="text-sm font-black text-gray-950">
                        {car.name}
                      </div>

                      <div className="mt-1 text-xs font-medium text-teal-600">
                        PKR{" "}
                        {car.dailyRate.toLocaleString()}
                        /day
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {specs.map((spec, index) => {
                  const Icon = spec.icon;

                  return (
                    <tr
                      key={spec.key}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50/70"
                      }
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                            <Icon size={16} />
                          </div>

                          <span className="text-sm font-bold text-gray-700">
                            {spec.label}
                          </span>
                        </div>
                      </td>

                      {selectedCars.map((car) => (
                        <td
                          key={car.id}
                          className="px-6 py-5 text-sm font-semibold text-gray-800"
                        >
                          {spec.key === "seats"
                            ? `${car[spec.key]} Seats`
                            : car[spec.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}

                {/* Availability */}
                <tr className="bg-white">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ShieldCheck size={16} />
                      </div>

                      <span className="text-sm font-bold text-gray-700">
                        Availability
                      </span>
                    </div>
                  </td>

                  {selectedCars.map((car) => (
                    <td
                      key={car.id}
                      className="px-6 py-5"
                    >
                      {car.available ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                          <Check size={13} />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                          Unavailable
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-gray-100 md:hidden">
            {specs.map((spec) => {
              const Icon = spec.icon;

              return (
                <div key={spec.key} className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon size={16} />
                    </div>

                    <p className="text-sm font-bold text-gray-800">
                      {spec.label}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {selectedCars.map((car) => (
                      <div
                        key={car.id}
                        className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                      >
                        <span className="text-xs font-semibold text-gray-500">
                          {car.name}
                        </span>

                        <span className="text-xs font-bold text-gray-900">
                          {spec.key === "seats"
                            ? `${car[spec.key]} Seats`
                            : car[spec.key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================
            TRUST STRIP
        =================================================== */}
        <section className="mt-8 rounded-[1.7rem] bg-[#08231f] p-7 text-white md:p-9">
          <div className="grid gap-7 md:grid-cols-3">
            <TrustItem
              icon={ShieldCheck}
              title="Reliable vehicles"
              text="Every car comes with clear specifications and rental information."
            />

            <TrustItem
              icon={Check}
              title="Transparent pricing"
              text="Compare daily rental prices before making your decision."
            />

            <TrustItem
              icon={Star}
              title="Easy experience"
              text="Find your vehicle and move to booking without unnecessary steps."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function TrustItem({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
        <Icon size={20} />
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-gray-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Compare;