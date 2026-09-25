import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Check,
  CreditCard,
  MapPin,
  User,
  ShieldCheck,
  Navigation,
} from "lucide-react";

import cars from "../data/cars";
import addOns, { calculateAddOnCost } from "../data/addOns";
import { addBooking } from "../lib/bookings";

function calculateDays(start, end) {
  if (!start || !end) return 1;

  const first = new Date(start);
  const second = new Date(end);

  const difference = Math.ceil((second - first) / (1000 * 60 * 60 * 24));

  return Math.max(difference, 1);
}

function initialAddonState() {
  return Object.fromEntries(addOns.map((addOn) => [addOn.id, false]));
}

function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const carId = Number(searchParams.get("car")) || cars[0].id;
  const car = cars.find((item) => item.id === carId) || cars[0];

  const locationFromUrl = searchParams.get("location") || "";
  const pickupDateFromUrl = searchParams.get("pickupDate") || "";
  const returnDateFromUrl = searchParams.get("returnDate") || "";

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    pickupLocation: locationFromUrl || car.location,
    pickupDate: pickupDateFromUrl,
    returnDate: returnDateFromUrl,
    name: "",
    email: "",
    phone: "",
    payment: "Cash on Pickup",
  });

  const [addons, setAddons] = useState(initialAddonState);

  const rentalDays = useMemo(
    () => calculateDays(form.pickupDate, form.returnDate),
    [form.pickupDate, form.returnDate]
  );

  const baseTotal = car.dailyRate * rentalDays;

  const addonTotal = useMemo(
    () =>
      addOns.reduce(
        (sum, addOn) =>
          sum + (addons[addOn.id] ? calculateAddOnCost(addOn, rentalDays) : 0),
        0
      ),
    [addons, rentalDays]
  );

  const total = baseTotal + addonTotal;

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleAddon = (addonId) => {
    setAddons((previous) => ({
      ...previous,
      [addonId]: !previous[addonId],
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!form.pickupLocation || !form.pickupDate || !form.returnDate) {
        alert("Please select pickup location, pickup date and return date.");
        return;
      }

      if (new Date(form.returnDate) < new Date(form.pickupDate)) {
        alert("Return date cannot be before pickup date.");
        return;
      }
    }

    if (step === 3) {
      if (!form.name || !form.email || !form.phone) {
        alert("Please fill in all customer details.");
        return;
      }
    }

    setStep((previous) => Math.min(previous + 1, 4));
  };

  const previousStep = () => {
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const completeBooking = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please complete your customer details.");
      setStep(3);
      return;
    }

    const booking = {
      id: `DE-${Date.now().toString().slice(-6)}`,
      car: car.name,
      carId,
      carImage: car.image,
      pickupLocation: form.pickupLocation,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      payment: form.payment,
      addons,
      rentalDays,
      baseTotal,
      addonTotal,
      total,
      status: "Upcoming",
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);

    navigate(`/confirmation?id=${booking.id}`);
  };

  const steps = [
    {
      number: 1,
      title: "Trip Details",
      icon: MapPin,
    },
    {
      number: 2,
      title: "Add-ons",
      icon: ShieldCheck,
    },
    {
      number: 3,
      title: "Customer",
      icon: User,
    },
    {
      number: 4,
      title: "Payment",
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
            DriveEasy
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Complete Your Booking
          </h1>

          <p className="mt-2 text-slate-600">
            Follow the simple steps below to reserve your car.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {steps.map((item) => {
              const Icon = item.icon;
              const completed = step > item.number;
              const active = step === item.number;

              return (
                <div key={item.number} className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${
                      completed || active
                        ? "bg-emerald-700 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {completed ? <Check size={18} /> : <Icon size={18} />}
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Step {item.number}
                    </p>

                    <p
                      className={`text-sm font-bold ${
                        active ? "text-emerald-700" : "text-slate-700"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Trip Details
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Tell us where and when you need the car.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Pickup Location
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-3.5 text-emerald-700"
                      />

                      <input
                        type="text"
                        value={form.pickupLocation}
                        onChange={(e) =>
                          updateForm("pickupLocation", e.target.value)
                        }
                        placeholder="Enter pickup city"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Pickup Date
                      </label>

                      <input
                        type="date"
                        value={form.pickupDate}
                        onChange={(e) =>
                          updateForm("pickupDate", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Return Date
                      </label>

                      <input
                        type="date"
                        value={form.returnDate}
                        min={form.pickupDate}
                        onChange={(e) =>
                          updateForm("returnDate", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-4">
                    <div className="flex items-center gap-3">
                      <Navigation size={20} className="text-emerald-700" />

                      <div>
                        <p className="font-semibold text-emerald-900">
                          Rental Duration
                        </p>
                        <p className="text-sm text-emerald-700">
                          {rentalDays} {rentalDays === 1 ? "day" : "days"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Choose Add-ons
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select any optional services you need.
                  </p>
                </div>

                <div className="space-y-4">
                  {addOns.map((addOn) => {
                    const cost = calculateAddOnCost(addOn, rentalDays);

                    return (
                      <button
                        key={addOn.id}
                        type="button"
                        onClick={() => toggleAddon(addOn.id)}
                        className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                          addons[addOn.id]
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                              addons[addOn.id]
                                ? "border-emerald-700 bg-emerald-700 text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {addons[addOn.id] && <Check size={15} />}
                          </div>

                          <div>
                            <p className="font-bold text-slate-900">
                              {addOn.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {addOn.description}
                            </p>
                          </div>
                        </div>

                        <p className="whitespace-nowrap font-bold text-emerald-700">
                          + PKR {cost.toLocaleString()}
                          {addOn.priceType === "perDay" && (
                            <span className="ml-1 text-xs font-medium text-emerald-600">
                              ({rentalDays} {rentalDays === 1 ? "day" : "days"})
                            </span>
                          )}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Customer Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter your contact information.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="+92 300 0000000"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose how you would like to pay.
                  </p>
                </div>

                <div className="space-y-4">
                  {["Cash on Pickup", "Card Payment"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateForm("payment", method)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                        form.payment === method
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                          form.payment === method
                            ? "bg-emerald-700 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <CreditCard size={20} />
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">{method}</p>

                        <p className="mt-1 text-sm text-slate-500">
                          {method === "Cash on Pickup"
                            ? "Pay when you collect your vehicle."
                            : "Pay securely using your card."}
                        </p>
                      </div>

                      {form.payment === method && (
                        <Check size={20} className="ml-auto text-emerald-700" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-900">Booking Summary</h3>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer</span>
                      <span className="font-semibold text-slate-800">
                        {form.name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment</span>
                      <span className="font-semibold text-slate-800">
                        {form.payment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex justify-between gap-4 border-t border-slate-200 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={previousStep}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={completeBooking}
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl">
              <img
                src={car.image}
                alt={car.name}
                className="h-48 w-full object-cover"
              />
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-emerald-700">
                Selected Car
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                {car.name}
              </h2>
            </div>

            <div className="my-5 border-t border-slate-200 pt-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Daily rate</span>

                  <span className="font-semibold text-slate-800">
                    PKR {car.dailyRate.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Rental days</span>

                  <span className="font-semibold text-slate-800">
                    {rentalDays}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Car rental</span>

                  <span className="font-semibold text-slate-800">
                    PKR {baseTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Add-ons</span>

                  <span className="font-semibold text-slate-800">
                    PKR {addonTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <div className="flex items-end justify-between">
                <span className="font-bold text-slate-900">Total</span>

                <span className="text-2xl font-extrabold text-emerald-700">
                  PKR {total.toLocaleString()}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Booking;
