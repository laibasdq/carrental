import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Car,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import cars from "../data/cars";

const featuredCars = cars.slice(0, 4);

const cities = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Abbottabad",
];

const testimonials = [
  {
    name: "Ahmed Khan",
    text: "The booking process was simple and the car was ready on time. Very convenient experience.",
    rating: 5,
  },
  {
    name: "Sara Ali",
    text: "I liked how easy it was to compare cars and check the rental details before booking.",
    rating: 5,
  },
  {
    name: "Usman Malik",
    text: "The website is easy to use and the overall rental process was smooth.",
    rating: 4,
  },
];

function Home() {
  const [currentFeatured, setCurrentFeatured] = useState(cars[0]);

  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextCar = () => {
    const currentIndex = cars.findIndex(
      (car) => car.id === currentFeatured.id
    );

    const nextIndex =
      currentIndex === cars.length - 1 ? 0 : currentIndex + 1;

    setCurrentFeatured(cars[nextIndex]);
  };

  const previousCar = () => {
    const currentIndex = cars.findIndex(
      (car) => car.id === currentFeatured.id
    );

    const previousIndex =
      currentIndex === 0 ? cars.length - 1 : currentIndex - 1;

    setCurrentFeatured(cars[previousIndex]);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const previousTestimonial = () => {
    setTestimonialIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location || !pickupDate || !returnDate) {
      alert("Please select your location and rental dates.");
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      alert("Return date must be after the pickup date.");
      return;
    }

    window.location.href = `/cars?location=${encodeURIComponent(
      location
    )}&pickupDate=${pickupDate}&returnDate=${returnDate}`;
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071c1a]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-700/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Text */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                <ShieldCheck size={16} />
                Trusted Car Rental Service
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Rent Your Perfect Car
                <span className="block text-emerald-400">
                  For Every Journey
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Choose from a wide range of comfortable and reliable cars.
                Book your ride quickly and enjoy a smooth rental experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-700"
                >
                  Browse Cars
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src={currentFeatured.image}
                  alt={currentFeatured.name}
                  className="h-[320px] w-full object-cover sm:h-[400px]"
                />
              </div>

              <button
                type="button"
                onClick={previousCar}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100"
                aria-label="Previous car"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={nextCar}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100"
                aria-label="Next car"
              >
                <ChevronRight size={22} />
              </button>

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-black/60 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-300">
                      Featured Car
                    </p>

                    <h3 className="text-xl font-bold text-white">
                      {currentFeatured.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-white">
                      Rs. {currentFeatured.dailyRate.toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-300">
                      per day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="relative z-10 mt-12 rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <Search className="text-emerald-700" size={21} />

              <h2 className="text-lg font-bold text-slate-900">
                Find Your Rental Car
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pickup Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700"
                  />

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">Select city</option>

                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pickup Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pickup Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700"
                  />

                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Return Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700"
                  />

                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800"
                >
                  <Search size={18} />
                  Search Cars
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
            Why Choose Us
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Simple, Reliable & Convenient
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Everything you need for a smooth and comfortable car rental
            experience.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Car size={25} />}
            title="Wide Range of Cars"
            text="Choose from sedans, SUVs, and hatchbacks according to your needs."
          />

          <FeatureCard
            icon={<ShieldCheck size={25} />}
            title="Safe & Reliable"
            text="Our rental process is designed to make your journey comfortable and secure."
          />

          <FeatureCard
            icon={<CalendarDays size={25} />}
            title="Easy Booking"
            text="Select your dates, choose a car, and complete your booking in simple steps."
          />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                Our Fleet
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Popular Rental Cars
              </h2>
            </div>

            <Link
              to="/cars"
              className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-800"
            >
              View All Cars
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-sm font-semibold text-emerald-700">
                    {car.category}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    {car.name}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {car.seats} Seats
                    </div>

                    <div className="flex items-center gap-2">
                      <Car size={16} />
                      {car.transmission}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-slate-900">
                        Rs. {car.dailyRate.toLocaleString()}
                      </span>

                      <span className="text-xs text-slate-500">
                        {" "}
                        / day
                      </span>
                    </div>

                    <Link
                      to={`/cars/${car.id}`}
                      className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
              Customer Reviews
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              What Our Customers Say
            </h2>
          </div>

          <div className="relative mt-10 rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={
                    index < currentTestimonial.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              "{currentTestimonial.text}"
            </p>

            <h3 className="mt-6 font-bold text-slate-900">
              {currentTestimonial.name}
            </h3>

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={previousTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071c1a] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Start Your Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Find the right car for your next trip and book it in just a few
            simple steps.
          </p>

          <Link
            to="/cars"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-700"
          >
            Explore Cars
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}

export default Home;