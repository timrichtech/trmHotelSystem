import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function About() {
  const features = [
    {
      icon: BuildingOffice2Icon,
      title: "Hotel Management",
      description:
        "Manage reservations, room availability, housekeeping, billing, and guest check-ins from one dashboard.",
    },
    {
      icon: UserGroupIcon,
      title: "Restaurant POS",
      description:
        "Take orders, manage tables, print receipts, and process payments quickly.",
    },
    {
      icon: ChartBarIcon,
      title: "Analytics",
      description:
        "Track revenue, occupancy, restaurant sales, and business performance with real-time reports.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Cloud",
      description:
        "Your data is encrypted, automatically backed up, and accessible anywhere.",
    },
    {
      icon: ClockIcon,
      title: "24/7 Availability",
      description:
        "Access your business anytime with our cloud-based hospitality platform.",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Mobile Friendly",
      description:
        "Manage your hotel and restaurant from any device, anywhere.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#070B22] text-gray-800 dark:text-white transition-colors duration-500">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <span className="uppercase tracking-[6px] text-indigo-500 font-semibold">
            About Us
          </span>

          <h1 className="text-3xl md:text-6xl font-bold mt-6">
            HotMan Software
            <br />
            Built For Modern Businesses
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-md md:text-lg text-gray-600 dark:text-gray-400">
            Our all-in-one Hotel & Restaurant Management Software helps
            businesses automate operations, improve guest experiences, simplify
            reservations, manage restaurants, and increase revenue through
            powerful cloud technology.
          </p>
        </div>
      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Our Story</h2>

            <p className="text-gray-600 dark:text-gray-400 leading-8 mb-6">
              Managing hotels and restaurants shouldn't require multiple
              systems. We built one platform that handles reservations, customer
              management, restaurant operations, payments, inventory, and
              reporting in one secure cloud application.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-8">
              Whether you own a boutique hotel, a luxury resort, a café, or a
              restaurant chain, our software grows with your business while
              saving time and reducing costs.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0D1330] rounded-3xl p-10 shadow-xl border border-gray-200 dark:border-indigo-900">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-indigo-500">
                  500+
                </h3>
                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Businesses
                </p>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-indigo-500">
                  50K+
                </h3>
                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Reservations
                </p>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-indigo-500">
                  99.9%
                </h3>
                <p className="mt-3 text-gray-500 dark:text-gray-400">Uptime</p>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-indigo-500">
                  24/7
                </h3>
                <p className="mt-3 text-gray-500 dark:text-gray-400">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Why Choose Our Platform?</h2>

          <p className="text-gray-600 dark:text-gray-400 mt-5">
            Everything you need to manage your hospitality business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0D1330] border border-gray-200 dark:border-indigo-900 rounded-2xl p-8 hover:-translate-y-2 transition duration-300 hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-indigo-500" />
                </div>

                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission */}

      <section className="bg-indigo-600 py-10 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-6 md:gap-12 text-white">
          <div>
            <h2 className="text-4xl font-bold mb-3  md:mb-6">Our Mission</h2>

            <p className="leading-8 text-indigo-100">
              To empower hospitality businesses with intuitive, affordable, and
              powerful software that improves efficiency, increases
              profitability, and enhances customer satisfaction.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-3 md:mb-6">Our Vision</h2>

            <p className="leading-8 text-indigo-100">
              To become the leading hospitality management platform trusted by
              hotels and restaurants worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-10 md:py-24 px-3 md:px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#0D1330] border border-gray-200 dark:border-indigo-900 rounded-3xl p-16 text-center shadow-xl">
          <h2 className="text-4xl font-bold">
            Ready to Transform Your Business?
          </h2>

          <p className="mt-3 md:mt-6 text-gray-600 dark:text-gray-400">
            Join hotels and restaurants already using our platform to simplify
            operations and deliver exceptional guest experiences.
          </p>

          <button className="mt-4 md:mt-10 px-4 text-nowrap md:px-10 py-2 md:py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
