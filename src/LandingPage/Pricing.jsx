import { useState } from "react";
import {
  CheckCircleIcon,
  StarIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import { Link, Navigate, useNavigate } from "react-router";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: billing === "monthly" ? 29 : 290,
      badge: "Starter",
      description: "Perfect for small hotels & cafés",
      color: "cyan",
      features: [
        "1 Hotel / Restaurant",
        "20 Rooms or Tables",
        "POS Billing",
        "Reservation Management",
        "Staff Management",
        "24/7 Email Support",
      ],
    },

    {
      name: "Premium",
      price: billing === "monthly" ? 69 : 690,
      badge: "Most Popular",
      popular: true,
      description: "Best for growing businesses",
      color: "lime",
      features: [
        "Unlimited Rooms",
        "Restaurant POS",
        "Inventory Management",
        "Online Booking",
        "Reports & Analytics",
        "Priority Support",
      ],
    },

    {
      name: "Gold",
      price: billing === "monthly" ? 129 : 1290,
      badge: "Enterprise",
      description: "Complete hotel chain solution",
      color: "yellow",
      features: [
        "Multiple Branches",
        "Cloud Backup",
        "Advanced Analytics",
        "CRM & Loyalty",
        "API Integration",
        "Dedicated Account Manager",
      ],
    },
  ];
  const handleSelectPlan = (plans) => {
    navigate("/payment", {
      state: {
        planName: plans.name,
        amount: plans.price,
      },
    });
  };

  return (
    // bg-[#070B22]
    <section className="bg-clear bg-[#070B22] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="text-center">
          <p className="uppercase tracking-[6px] text-cyan-400 font-semibold">
            Pricing
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Flexible Pricing
            <br />
            for Every Hotel & Restaurant
          </h1>

          <p className="text-green-600 mt-5 max-w-2xl mx-auto">
            Choose the perfect plan for your hospitality business. Upgrade
            anytime as your hotel or restaurant grows.
          </p>
        </div>

        {/* Toggle */}

        <div className="flex justify-center mt-14">
          <div className="bg-[#101735] rounded-full p-1 flex shadow-lg border border-indigo-700">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-8 py-3 rounded-full transition ${
                billing === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("annual")}
              className={`px-8 py-3 rounded-full transition ${
                billing === "annual"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-10 mt-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl overflow-hidden border transition duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(79,70,229,0.45)]
              ${
                plan.popular
                  ? "border-indigo-500 bg-gradient-to-b from-indigo-900 to-[#131936] scale-105"
                  : "border-indigo-900 bg-[#0D1330]"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-5 right-5 bg-lime-400 text-black px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-5 md:p-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-indigo-700/30 md:w-20 w-10 h-10 md:h-20 rounded-full flex items-center justify-center border border-indigo-500">
                    {plan.name === "Basic" && (
                      <BuildingOffice2Icon className="md:w-10 w-5 h-5 md:h-10 text-cyan-400" />
                    )}

                    {plan.name === "Premium" && (
                      <StarIcon className="md:w-10 w-5 h-5 md:h-10 text-lime-400" />
                    )}

                    {plan.name === "Gold" && (
                      <StarIcon className="md:w-10 w-5 h-5 md:h-10 text-yellow-400" />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs tracking-[4px] uppercase bg-indigo-900 px-4 py-2 rounded-full text-cyan-300">
                    {plan.badge}
                  </span>

                  <h2 className="text-3xl font-bold mt-3 md:mt-6">
                    {plan.name}
                  </h2>

                  <div className="mt-3 md:mt-5">
                    <span className="text-4xl md:text-6xl font-extrabold">
                      ${plan.price}
                    </span>

                    <span className="text-gray-400 ml-2">
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-400">{plan.description}</p>
                </div>

                <div className="border-t border-indigo-800 my-8"></div>

                <ul className="space-y-5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-1 md:gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-lime-400" />

                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full mt-5 md:mt-10 rounded-xl font-semibold transition
                  ${
                    plan.popular
                      ? "bg-lime-400 text-black hover:bg-lime-300"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                  onClick={() => handleSelectPlan(plans)}
                >
                  <Link
                    to="/payment"
                    // state={{
                    //   plan: {
                    //     name: plan.name,
                    //     price: plan.price,
                    //   },
                    // }}
                    className=" block w-full rounded-lg bg-blue-600 px-2
             md:px-5 py-1 md:py-3 text-center font-semibold text-white
             hover:bg-blue-700 transition"
                  >
                    Get Started
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
