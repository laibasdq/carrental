import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Fuel,
  GitCompare,
  Heart,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";

import cars from "../data/cars";

function Cars() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [transmission, setTransmission] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [seats, setSeats] = useState("All");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(16000);
  const [sortBy, setSortBy] = useState("featured");
  const [compareCars, setCompareCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mobileFilters, setMobileFilters] = useState(false);

  const categories = ["All", "Sedan", "SUV", "Hatchback", "Luxury"];
  const transmissions = ["All", "Automatic", "Manual"];
  const fuels = ["All", "Petrol", "Diesel"];

  const brands = useMemo(() => {
    return [
      "All",
      ...new Set(cars.map((car) => car.name.split(" ")[0])),
    ];
  }, []);

  const seatOptions = ["All", "5", "7", "12"];

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const searchMatch =
        search.trim() === "" ||
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.category.toLowerCase().includes(search.toLowerCase()) ||
        car.location.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || car.category === category;

      const transmissionMatch =
        transmission === "All" ||
        car.transmission === transmission;

      const fuelMatch = fuel === "All" || car.fuel === fuel;

      const seatsMatch =
        seats === "All" || String(car.seats) === seats;

      const brandMatch =
        brand === "All" || car.name.startsWith(brand);

      const priceMatch = car.dailyRate <= maxPrice;

      return (
        searchMatch &&
        categoryMatch &&
        transmissionMatch &&
        fuelMatch &&
        seatsMatch &&
        brandMatch &&
        priceMatch
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.dailyRate - b.dailyRate);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.dailyRate - a.dailyRate);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    search,
    category,
    transmission,
    fuel,
    seats,
    brand,
    maxPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setTransmission("All");
    setFuel("All");
    setSeats("All");
    setBrand("All");
    setMaxPrice(16000);
    setSortBy("featured");
  };

  const toggleCompare = (carId) => {
    setCompareCars((current) => {
      if (current.includes(carId)) {
        return current.filter((id) => id !== carId);
      }

      if (current.length >= 3) {
        window.alert("You can compare a maximum of 3 cars.");
        return current;
      }

      return [...current, carId];
    });
  };

  const toggleFavorite = (carId) => {
    setFavorites((current) =>
      current.includes(carId)
        ? current.filter((id) => id !== carId)
        : [...current, carId]
    );
  };

  const saveCompareCars = () => {
    if (compareCars.length < 2) {
      window.alert("Select at least 2 cars to compare.");
      return;
    }

    localStorage.setItem(
      "compareCars",
      JSON.stringify(compareCars)
    );

    window.location.href = "/compare";
  };

  const compareSelected = (carId) =>
    compareCars.includes(carId);

  return (
    <main className="min-h-screen bg-[#f5f8f7]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071c1a]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071c1a] via-[#071c1a]/90 to-[#071c1a]/55" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              <Zap size={14} />
              Find your next ride
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Choose the car that
              <span className="block text-emerald-400">
                fits your journey.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl leading-8 text-slate-300">
              Explore our collection of reliable, comfortable, and premium
              vehicles. Filter by what matters to you and compare your
              favorites before booking.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-6 lg:px-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <Search
                size={19}
                className="shrink-0 text-emerald-700"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by car, category, or location..."
                className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 lg:min-w-[210px]">
              <span className="pl-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                Sort
              </span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full bg-transparent px-1 text-sm font-semibold text-slate-700 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="name">Name: A-Z</option>
              </select>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-emerald-700" />

                <h2 className="font-bold text-slate-900">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
              >
                Reset
              </button>
            </div>

            <FilterContent
              category={category}
              setCategory={setCategory}
              transmission={transmission}
              setTransmission={setTransmission}
              fuel={fuel}
              setFuel={setFuel}
              seats={seats}
              setSeats={setSeats}
              brand={brand}
              setBrand={setBrand}
              brands={brands}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              categories={categories}
              transmissions={transmissions}
              fuels={fuels}
              seatOptions={seatOptions}
            />
          </aside>

          {/* MOBILE FILTER */}
          {mobileFilters && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="absolute inset-0 bg-black/50"
                aria-label="Close filters"
              />

              <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2">
                    <Filter
                      size={18}
                      className="text-emerald-700"
                    />

                    <h2 className="font-bold text-slate-900">
                      Filters
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileFilters(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <FilterContent
                  category={category}
                  setCategory={setCategory}
                  transmission={transmission}
                  setTransmission={setTransmission}
                  fuel={fuel}
                  setFuel={setFuel}
                  seats={seats}
                  setSeats={setSeats}
                  brand={brand}
                  setBrand={setBrand}
                  brands={brands}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  categories={categories}
                  transmissions={transmissions}
                  fuels={fuels}
                  seatOptions={seatOptions}
                />

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={() => setMobileFilters(false)}
                    className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white"
                  >
                    Show cars
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Showing{" "}
                  <span className="font-black text-slate-900">
                    {filteredCars.length}
                  </span>{" "}
                  vehicles
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                  Available cars
                </h2>
              </div>

              {compareCars.length > 0 && (
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 sm:self-auto">
                  <GitCompare size={15} />
                  {compareCars.length}/3 selected
                </div>
              )}
            </div>

            {filteredCars.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Search size={27} />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-900">
                  No cars found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try changing your search or removing some filters to see
                  more available vehicles.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  <RotateCcw size={16} />
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car, index) => {
                  const isCompared = compareSelected(car.id);
                  const isFavorite = favorites.includes(car.id);

                  return (
                    <article
                      key={car.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl"
                      style={{
                        animation: `fadeUp 0.5s ease ${index * 0.04}s both`,
                      }}
                    >
                      {/* IMAGE */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                        <div className="absolute left-4 top-4 flex gap-2">
                          {index < 2 && (
                            <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
                              Popular
                            </span>
                          )}

                          {car.category === "Luxury" && (
                            <span className="rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white backdrop-blur-md">
                              Luxury
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleFavorite(car.id)}
                          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
                            isFavorite
                              ? "bg-rose-500 text-white"
                              : "bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500"
                          }`}
                          aria-label={
                            isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <Heart
                            size={18}
                            fill={
                              isFavorite
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                          <div>
                            <p className="text-xs font-semibold text-emerald-300">
                              {car.category}
                            </p>

                            <h3 className="mt-1 text-xl font-black text-white">
                              {car.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800">
                            <Star
                              size={13}
                              fill="currentColor"
                              className="text-amber-500"
                            />
                            4.9
                          </div>
                        </div>
                      </div>

                      {/* CARD BODY */}
                      <div className="p-5">
                        <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-5">
                          <Spec
                            icon={<Users size={15} />}
                            label={`${car.seats} seats`}
                          />

                          <Spec
                            icon={<Zap size={15} />}
                            label={car.transmission}
                          />

                          <Spec
                            icon={<Fuel size={15} />}
                            label={car.fuel}
                          />
                        </div>

                        <div className="mt-5 flex items-end justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Starting from
                            </p>

                            <p className="mt-1 text-2xl font-black text-slate-900">
                              Rs. {car.dailyRate.toLocaleString()}
                            </p>

                            <p className="text-xs text-slate-400">
                              per day
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Location
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-600">
                              {car.location}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                          <Link
                            to={`/cars/${car.id}`}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#071c1a] px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                          >
                            View details
                            <ArrowRight size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => toggleCompare(car.id)}
                            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                              isCompared
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            }`}
                            title={
                              isCompared
                                ? "Remove from compare"
                                : "Add to compare"
                            }
                          >
                            {isCompared ? (
                              <Check size={18} />
                            ) : (
                              <GitCompare size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMPARE BAR */}
      {compareCars.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <GitCompare size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-black text-slate-900">
                  Compare vehicles
                </p>

                <p className="truncate text-xs text-slate-500">
                  {compareCars.length} of 3 vehicles selected
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setCompareCars([])}
                className="hidden rounded-xl px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 sm:block"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={saveCompareCars}
                className="rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Spec({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center">
      <span className="text-slate-400">{icon}</span>
      <span className="text-[10px] font-semibold text-slate-500">
        {label}
      </span>
    </div>
  );
}

function FilterContent({
  category,
  setCategory,
  transmission,
  setTransmission,
  fuel,
  setFuel,
  seats,
  setSeats,
  brand,
  setBrand,
  brands,
  maxPrice,
  setMaxPrice,
  categories,
  transmissions,
  fuels,
  seatOptions,
}) {
  return (
    <div className="mt-6 space-y-6">
      <FilterGroup title="Vehicle type">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="filter-select"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Brand">
        <select
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          className="filter-select"
        >
          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Transmission">
        <select
          value={transmission}
          onChange={(event) => setTransmission(event.target.value)}
          className="filter-select"
        >
          {transmissions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Fuel">
        <select
          value={fuel}
          onChange={(event) => setFuel(event.target.value)}
          className="filter-select"
        >
          {fuels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Seats">
        <select
          value={seats}
          onChange={(event) => setSeats(event.target.value)}
          className="filter-select"
        >
          {seatOptions.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "Any number" : `${item} seats`}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Maximum daily price">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-400">Budget</span>
          <span className="text-emerald-700">
            Rs. {maxPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min="3000"
          max="16000"
          step="500"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(Number(event.target.value))
          }
          className="mt-4 w-full accent-emerald-700"
        />

        <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-400">
          <span>Rs. 3,000</span>
          <span>Rs. 16,000+</span>
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </label>

      {children}
    </div>
  );
}

export default Cars;