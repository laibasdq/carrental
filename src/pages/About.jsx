import {
  Car,
  ShieldCheck,
  Wallet,
  Clock3,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function About() {
  useDocumentTitle("About | DriveEasy");

  const features = [
    {
      icon: Car,
      title: "Wide vehicle selection",
      description:
        "Choose from practical city cars, comfortable sedans, and spacious vehicles for longer journeys.",
    },
    {
      icon: ShieldCheck,
      title: "Simple & secure booking",
      description:
        "A straightforward booking process helps you select your vehicle and trip details with confidence.",
    },
    {
      icon: Wallet,
      title: "Clear pricing",
      description:
        "See the rental price and additional charges clearly before confirming your booking.",
    },
    {
      icon: Clock3,
      title: "Flexible journeys",
      description:
        "Select pickup and return dates that fit your plans without unnecessary complications.",
    },
  ];

  const stats = [
    {
      value: "4+",
      label: "Vehicle options",
    },
    {
      value: "24/7",
      label: "Booking access",
    },
    {
      value: "3",
      label: "Cars for comparison",
    },
    {
      value: "100%",
      label: "Simple experience",
    },
  ];

  const values = [
    "Easy vehicle discovery",
    "Transparent rental information",
    "Simple booking experience",
    "Responsive customer support",
  ];

  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-[#071c1a] text-white">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85"
          alt="Scenic road surrounded by mountains"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071c1a] via-[#071c1a]/90 to-[#071c1a]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071c1a] via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 backdrop-blur-md">
              <Sparkles size={16} />
              About DriveEasy
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
              More than a rental.
              <span className="block text-emerald-400">
                It's your journey.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              DriveEasy is designed to make finding, comparing, and booking a
              rental car feel simple, transparent, and stress-free.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-emerald-400"
              >
                Explore cars
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/15"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Our story
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Designed around the way people actually travel.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Renting a car should not feel complicated. DriveEasy brings the
              important parts of the rental journey together in one place so
              you can discover vehicles, compare options, choose your dates,
              and complete your booking with fewer steps.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Whether you're planning a quick city trip, a family journey, or
              a longer road adventure, our goal is to give you a clean and
              convenient experience from the moment you start searching until
              you return the vehicle.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-emerald-600"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
                alt="Modern car on the road"
                className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 left-5 right-5 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:left-auto sm:w-[320px]">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Starting from Islamabad
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Built for convenient journeys around the city and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#071c1a] px-6 py-14 text-white md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <p className="text-3xl font-bold text-emerald-400 sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Why DriveEasy
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need for a smoother rental experience.
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              We keep the experience focused on the things that matter when
              you're planning a trip.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#071c1a]">
            <img
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85"
              alt="Car driving on a road"
              className="h-[480px] w-full object-cover opacity-85"
            />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              How it works
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Your next car is only a few steps away.
            </h2>

            <div className="mt-9 space-y-7">
              {[
                {
                  number: "01",
                  title: "Find your vehicle",
                  text: "Browse available cars and use filters to narrow down your options.",
                },
                {
                  number: "02",
                  title: "Compare your options",
                  text: "Select up to three vehicles and compare their important specifications.",
                },
                {
                  number: "03",
                  title: "Choose your dates",
                  text: "Enter your pickup and return details and select any additional options.",
                },
                {
                  number: "04",
                  title: "Complete your booking",
                  text: "Provide your details, choose a payment method, and confirm your trip.",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY / TRUST */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-900 to-[#071c1a] px-7 py-12 text-white sm:px-10 lg:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300">
                <Users size={23} />
              </div>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Built with the driver in mind.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                From finding the right vehicle to reviewing your booking, every
                part of DriveEasy is designed to keep the experience clear and
                convenient.
              </p>
            </div>

            <Link
              to="/cars"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-emerald-400"
            >
              Start exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;