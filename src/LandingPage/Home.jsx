import {
  ArrowRightIcon,
  CheckCircleIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UsersIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: BuildingOffice2Icon,
      title: "Hotel Management",
      description:
        "Manage rooms, guests, reservations and housekeeping from one dashboard.",
    },
    {
      icon: CalendarDaysIcon,
      title: "Online Booking",
      description:
        "Accept direct bookings and manage availability in real-time.",
    },
    {
      icon: ClipboardDocumentListIcon,
      title: "Restaurant POS",
      description:
        "Orders, tables, kitchen management and billing made simple.",
    },
    {
      icon: ChartBarIcon,
      title: "Reports & Analytics",
      description: "Track revenue, occupancy, restaurant sales and expenses.",
    },
    {
      icon: UsersIcon,
      title: "Customer CRM",
      description:
        "Build guest loyalty with customer profiles and booking history.",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Cloud Access",
      description: "Manage your business anywhere from any device.",
    },
  ];
  // dark:bg-[#070B22] .,

  return (
    <div className="bg-[#070B22]  text-gray-900  justify-center dark:text-white transition-colors duration-500">
      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="px-4 text-sm md:text-xl text-wrap py-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-semibold">
              Hotel & Restaurant Management
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
              Manage Your
              <span className="text-indigo-600"> Hospitality </span>
              Business Smarter.
            </h1>

            <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 leading-8">
              One cloud platform to manage hotel reservations, restaurant POS,
              inventory, staff, guests, payments, analytics and much more.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </button>

              <button className="border border-indigo-500 px-8 py-4 rounded-xl hover:bg-indigo-600 hover:text-white transition">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-14">
              <div>
                <h2 className="text-4xl font-bold">500+</h2>
                <p className="text-gray-500 dark:text-gray-400">Businesses</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">99.9%</h2>
                <p className="text-gray-500 dark:text-gray-400">Uptime</p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-900 p-3 shadow-2xl">
              <div className="rounded-3xl bg-white dark:bg-[#101735] p-4 md:p-8">
                <h3 className="text-2xl font-bold mb-4 md:mb-8">
                  Dashboard Preview
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-indigo-100 dark:bg-[#1B2550] rounded-xl p-6">
                    <h4 className=" text-2xl md:text-4xl font-bold">128</h4>
                    <p>Rooms Booked</p>
                  </div>

                  <div className="bg-indigo-100 dark:bg-[#1B2550] rounded-xl p-6">
                    <h4 className="text-2xl md:text-4xl font-bold">$18K</h4>
                    <p>Monthly Revenue</p>
                  </div>

                  <div className="bg-indigo-100 dark:bg-[#1B2550] rounded-xl p-3 md:p-6">
                    <h4 className="text-2xl md:text-4xl font-bold">92%</h4>
                    <p>Occupancy</p>
                  </div>

                  <div className="bg-indigo-100 dark:bg-[rgb(27,37,80)] rounded-xl p-3 md:p-6">
                    <h4 className="text-2xl md:text-4xl font-bold">320</h4>
                    <p>Restaurant Orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl text-blue-600 font-bold">
              Everything You Need
            </h2>

            <p className="mt-5 text-gray-500 dark:text-gray-400">
              Powerful tools to simplify hospitality management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl  border border-gray-200 dark:border-indigo-900 bg-white dark:bg-[#101735] p-8 hover:-translate-y-2 transition shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>

                  <h3 className="text-2xl font-semibold">{feature.title}</h3>

                  <p className="mt-4 text-gray-500 dark:text-gray-400 leading-7">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}

      <section className="bg-indigo-600 py-10 md:py-24  text-white rounded-lg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-bold">Why Choose Us?</h2>

              <p className="mt-4 md:mt-8 text-indigo-100 leading-8">
                Built specifically for hotels, restaurants, resorts and
                hospitality businesses looking to modernize operations.
              </p>
            </div>

            <div className="space-y-3 md:space-y-6">
              {[
                "Cloud Based Platform",
                "Secure Online Payments",
                "Automatic Reports",
                "Restaurant POS Included",
                "Multi-Branch Support",
                "24/7 Customer Support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <CheckCircleIcon className="w-7 h-7" />

                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className=" py-12 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-700 p-16 text-center text-white">
            <h2 className="text-2xl md:text-5xl font-bold">
              Ready to Grow Your Business?
            </h2>

            <p className="mt-6 text-md md:text-lg text-indigo-100">
              Start managing your hotel and restaurant smarter today.
            </p>

            <button className=" mt-5 px-5 py-2 md:mt-10 bg-white text-indigo-700 md:px-10 md:py-4 rounded-xl font-bold hover:scale-105 transition">
              <Link to="/Landing#pricing">Get Started Free</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
