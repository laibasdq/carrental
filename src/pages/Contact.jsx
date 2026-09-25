import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";

const faqs = [
  {
    question: "How can I book a car?",
    answer:
      "Choose a car, select your rental dates and location, add optional services, and complete the booking form.",
  },
  {
    question: "What documents do I need?",
    answer:
      "A valid driving license and identification document are generally required at pickup.",
  },
  {
    question: "Can I modify my booking?",
    answer:
      "Upcoming bookings can be modified according to vehicle availability and rental terms.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation depends on the rental terms associated with your booking.",
  },
];

function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f5f8f7]">
      {/* HERO */}
      <section className="bg-[#071c1a] px-6 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 sm:text-sm">
            Get in touch
          </p>

          <h1 className="mt-4 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            How can we help?
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Have a question about a vehicle, booking, or rental?
            Send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* CONTACT CARDS */}
        <div className="grid gap-5 sm:grid-cols-3">
          <ContactCard
            icon={<Phone size={22} />}
            title="Call Us"
            text="+92 300 1234567"
          />

          <ContactCard
            icon={<Mail size={22} />}
            title="Email"
            text="support@driveeasy.com"
          />

          <ContactCard
            icon={<Clock size={22} />}
            title="Working Hours"
            text="Mon - Sat, 9 AM - 7 PM"
          />
        </div>

        {/* FORM + MAP */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* CONTACT FORM */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Contact us
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Send us a message
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-500">
                Fill out the form below and our team will get back to
                you as soon as possible.
              </p>
            </div>

            {submitted ? (
              <div className="mt-9 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white">
                  <CheckCircle size={31} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-slate-900">
                  Message Sent
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-600">
                  Thanks for contacting us. We will get back to you
                  soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl border border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-800 transition hover:bg-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Name"
                    placeholder="Your name"
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="How can we help?"
                />

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Message
                  </span>

                  <textarea
                    required
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
                >
                  Send Message
                </button>
              </form>
            )}
          </section>

          {/* MAP */}
          <section>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="relative flex h-[420px] items-center justify-center overflow-hidden bg-emerald-50">
                {/* Map-style background */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute left-10 top-12 h-28 w-28 rounded-full border border-emerald-200" />

                  <div className="absolute right-16 top-20 h-36 w-36 rounded-full border border-emerald-200" />

                  <div className="absolute bottom-10 left-1/4 h-24 w-48 rounded-full border border-emerald-200" />

                  <div className="absolute left-0 top-1/2 h-px w-full rotate-6 bg-emerald-200" />

                  <div className="absolute left-0 top-1/3 h-px w-full -rotate-6 bg-emerald-200" />
                </div>

                <div className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-700 text-white shadow-xl shadow-emerald-900/20">
                    <MapPin size={36} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-900">
                    DriveEasy Office
                  </h3>

                  <p className="mt-2 text-base font-semibold text-emerald-800">
                    Islamabad, Pakistan
                  </p>

                  <p className="mt-4 text-sm text-slate-500">
                    Our main office location
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 p-6">
                <p className="text-sm leading-6 text-slate-600">
                  <strong className="text-slate-900">
                    Address:
                  </strong>{" "}
                  Main Business Avenue, Islamabad
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ */}
        <section className="mt-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-sm">
              Need to know?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Find quick answers to common questions about our rental
              service.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 p-6 text-left transition hover:bg-emerald-50/40"
                  >
                    <span className="text-base font-bold text-slate-900 sm:text-lg">
                      {faq.question}
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <ChevronDown
                        size={19}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-emerald-100 px-6 pb-6 pt-5 text-sm leading-7 text-slate-600 sm:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="mt-20 overflow-hidden rounded-[2rem] bg-[#071c1a] px-7 py-12 sm:px-12 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                DriveEasy Support
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Still have questions?
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                Our team is here to help you with bookings, vehicles,
                and rental information.
              </p>
            </div>

            <a
              href="mailto:support@driveeasy.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              <Mail size={18} />
              Email Support
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        {...props}
        required
        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}

export default Contact;