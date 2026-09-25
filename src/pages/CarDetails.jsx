import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Users,
  Fuel,
  Settings2,
} from "lucide-react";

import cars from "../data/cars";

const cities = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Abbottabad",
];

function buildDescription(car) {
  return `A ${car.transmission.toLowerCase()} ${car.category.toLowerCase()} available for pickup in ${car.location}, comfortably seating up to ${car.seats} passengers.`;
}

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = cars.find((item) => String(item.id) === String(id));

  const [pickupLocation, setPickupLocation] = useState(car?.location || "");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [favorite, setFavorite] = useState(false);

  if (!car) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <Car className="mx-auto text-emerald-700" size={48} />

          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
            Car Not Found
          </h1>

          <p className="mt-2 text-slate-600">
            The car you are looking for is not available.
          </p>

          <button
            type="button"
            onClick={() => navigate("/cars")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft size={18} />
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = (event) => {
    event.preventDefault();

    if (!pickupLocation || !pickupDate || !returnDate) {
      alert("Please select your pickup location and rental dates.");
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      alert("Return date must be after the pickup date.");
      return;
    }

    const bookingUrl =
      `/booking?car=${car.id}` +
      `&location=${encodeURIComponent(pickupLocation)}` +
      `&pickupDate=${pickupDate}` +
      `&returnDate=${returnDate}`;

    navigate(bookingUrl);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${car.name} - DriveEasy`,
      text: `Check out the ${car.name} on DriveEasy.`,
      url: window.location.href,
    };

    try {
      if (navigator.share && typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }

      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Car link copied to clipboard.");
      }
    } catch {
      // Sharing was cancelled or unavailable.
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/cars")}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"
          >
            <ArrowLeft size={18} />
            Back to Cars
          </button>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left Side */}
          <section>
            {/* Hero Image */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-video bg-slate-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover"
                />

                {!car.available && (
                  <div className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white">
                    Currently Unavailable
                  </div>
                )}
              </div>
            </div>

            {/* Car Information */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    {car.category}
                  </p>

                  <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
                    {car.name}
                  </h1>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={14} />
                    {car.location}
                  </p>

                  <p className="mt-3 leading-7 text-slate-600">
                    {buildDescription(car)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFavorite((current) => !current)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                      favorite
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                    aria-label="Add to favorites"
                  >
                    <Heart size={20} fill={favorite ? "currentColor" : "none"} />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                    aria-label="Share car"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Spec
                  icon={<Settings2 size={20} />}
                  label="Transmission"
                  value={car.transmission}
                />

                <Spec icon={<Fuel size={20} />} label="Fuel" value={car.fuel} />

                <Spec
                  icon={<Users size={20} />}
                  label="Seats"
                  value={`${car.seats} Seats`}
                />

                <Spec
                  icon={<Car size={20} />}
                  label="Category"
                  value={car.category}
                />
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Features</h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {car.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={16} />
                    </div>

                    <span className="text-sm font-medium text-slate-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Terms (from the car's own data, not generic copy) */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Rental Terms
              </h2>

              <div className="mt-5 space-y-4">
                <Term
                  title="Minimum driver age"
                  text={`${car.rentalTerms.minAge} years or older.`}
                />

                <Term
                  title="Security deposit"
                  text={`Rs. ${car.rentalTerms.deposit.toLocaleString()} refundable deposit.`}
                />

                <Term
                  title="Mileage limit"
                  text={car.rentalTerms.mileageLimit}
                />

                <Term title="Fuel policy" text={car.rentalTerms.fuelPolicy} />
              </div>
            </div>
          </section>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">Rental price</p>

                  <p className="mt-1 text-3xl font-extrabold text-emerald-700">
                    Rs. {car.dailyRate.toLocaleString()}
                  </p>

                  <p className="text-sm text-slate-500">per day</p>

                  <p className="mt-1 text-xs text-slate-400">
                    Rs. {car.weeklyRate.toLocaleString()} / week
                  </p>
                </div>

                <ShieldCheck size={30} className="text-emerald-600" />
              </div>

              <div className="my-6 border-t border-slate-200" />

              <form onSubmit={handleBooking} className="space-y-5">
                {/* Pickup Location */}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Pickup Location
                  </span>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700"
                    />

                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">Select pickup city</option>

                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                {/* Pickup Date */}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Pickup Date
                  </span>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700"
                    />

                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </label>

                {/* Return Date */}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Return Date
                  </span>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700"
                    />

                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </label>

                {/* Book Button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white transition hover:bg-emerald-800"
                >
                  Continue to Booking
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-700"
                />

                <p className="text-xs leading-5 text-emerald-800">
                  Your booking details are handled securely.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="text-emerald-700">{icon}</div>

      <p className="mt-3 text-xs text-slate-500">{label}</p>

      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function Term({ title, text }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check size={14} />
      </div>

      <div>
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default CarDetails;
