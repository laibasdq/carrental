import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  Printer,
  Mail,
  Car,
  MapPin,
  CalendarDays,
  User,
  Phone,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import addOns, { calculateAddOnCost } from "../data/addOns";
import { findBookingById } from "../lib/bookings";

function Confirmation() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id");

  // Reading from localStorage is a pure lookup based on the id in the URL,
  // so it's derived directly during render instead of via useEffect + setState.
  const booking = useMemo(() => findBookingById(bookingId), [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!booking) return;

    const content = `
DRIVEEASY
BOOKING CONFIRMATION

Booking Reference: ${booking.id}

Car: ${booking.car}
Pickup Location: ${booking.pickupLocation}
Pickup Date: ${booking.pickupDate}
Return Date: ${booking.returnDate}
Rental Days: ${booking.rentalDays || 1}

Customer Name: ${booking.customerName}
Email: ${booking.email}
Phone: ${booking.phone}

Payment Method: ${booking.payment}

Total: PKR ${Number(booking.total || 0).toLocaleString()}

Thank you for choosing DriveEasy.
    `.trim();

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${booking.id}-confirmation.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleEmail = () => {
    if (!booking?.email) return;

    const subject = encodeURIComponent(
      `DriveEasy Booking Confirmation - ${booking.id}`
    );

    const body = encodeURIComponent(
      `Hello ${booking.customerName},

Your DriveEasy booking has been confirmed.

Booking Reference: ${booking.id}
Car: ${booking.car}
Pickup Location: ${booking.pickupLocation}
Pickup Date: ${booking.pickupDate}
Return Date: ${booking.returnDate}
Total: PKR ${Number(booking.total || 0).toLocaleString()}

Thank you for choosing DriveEasy.`
    );

    window.location.href = `mailto:${booking.email}?subject=${subject}&body=${body}`;
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Car size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Booking Not Found
          </h1>

          <p className="mt-2 text-slate-600">
            We could not find the booking you are looking for.
          </p>

          <Link
            to="/cars"
            className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  const selectedAddons = Object.entries(booking.addons || {})
    .filter(([, selected]) => selected)
    .map(([id]) => {
      const addOn = addOns.find((item) => item.id === id);
      if (!addOn) return null;

      return {
        name: addOn.name,
        price: calculateAddOnCost(addOn, booking.rentalDays || 1),
      };
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={44} />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-emerald-700">
            Booking Confirmed
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Your car is reserved!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Thank you for choosing DriveEasy. Your booking details
            are shown below.
          </p>

          <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-slate-200">
            <span className="text-sm text-slate-500">
              Booking Reference
            </span>

            <span className="font-extrabold text-emerald-700">
              {booking.id}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Download size={17} />
            Download
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Printer size={17} />
            Print
          </button>

          <button
            type="button"
            onClick={handleEmail}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            <Mail size={17} />
            Email
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Car */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {booking.carImage && (
                <div className="h-64">
                  <img
                    src={booking.carImage}
                    alt={booking.car}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <p className="text-sm font-semibold text-emerald-700">
                  Reserved Vehicle
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                  {booking.car}
                </h2>
              </div>
            </div>

            {/* Trip Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">
                Trip Details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Pickup Location
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {booking.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Pickup Date
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {booking.pickupDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Return Date
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {booking.returnDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Car size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Rental Duration
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {booking.rentalDays || 1}{" "}
                      {(booking.rentalDays || 1) === 1
                        ? "Day"
                        : "Days"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Customer Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">
                Customer Details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div className="flex gap-3">
                  <User
                    size={19}
                    className="mt-1 text-emerald-700"
                  />

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Name
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.customerName}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail
                    size={19}
                    className="mt-1 text-emerald-700"
                  />

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Email
                    </p>

                    <p className="mt-1 break-all font-semibold text-slate-900">
                      {booking.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone
                    size={19}
                    className="mt-1 text-emerald-700"
                  />

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Phone
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CreditCard
                    size={19}
                    className="mt-1 text-emerald-700"
                  />

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Payment
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.payment}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* What to Bring */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex gap-3">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-emerald-700"
                />

                <div>
                  <h2 className="font-extrabold text-emerald-900">
                    What to Bring
                  </h2>

                  <ul className="mt-3 space-y-2 text-sm text-emerald-800">
                    <li>• Valid driving license</li>
                    <li>• Original CNIC or valid ID</li>
                    <li>• Booking reference</li>
                    <li>• Selected payment method</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold text-slate-900">
              Payment Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Car rental
                </span>

                <span className="font-semibold text-slate-800">
                  PKR{" "}
                  {Number(
                    booking.baseTotal || booking.total || 0
                  ).toLocaleString()}
                </span>
              </div>

              {selectedAddons.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <p className="mb-3 font-semibold text-slate-700">
                    Add-ons
                  </p>

                  {selectedAddons.map((addon) => (
                    <div
                      key={addon.name}
                      className="mb-2 flex justify-between gap-4"
                    >
                      <span className="text-slate-500">
                        {addon.name}
                      </span>

                      <span className="font-semibold text-slate-800">
                        PKR {addon.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-bold text-slate-900">
                    Total
                  </span>

                  <span className="text-xl font-extrabold text-emerald-700">
                    PKR{" "}
                    {Number(
                      booking.total || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Booking Status
              </p>

              <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                {booking.status || "Upcoming"}
              </span>
            </div>

            <div className="mt-6 space-y-3 print:hidden">
              <Link
                to="/my-bookings"
                className="block w-full rounded-xl bg-emerald-700 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Manage My Bookings
              </Link>

              <Link
                to="/cars"
                className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Browse More Cars
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;