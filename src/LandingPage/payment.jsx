import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import { FaCreditCard, FaMobile, FaPhone } from "react-icons/fa";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Plan information passed from Pricing page
  const { planName, amount } = location.state?.plan || {};
  // name: "Premium",
  // price: 69,

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    setLoading(true);

    // payment API to be conected
    setTimeout(() => {
      setLoading(false);
      alert("payment-success");

      navigate("/admindashboard", {
        state: {
          plan: planName,
        },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold">TRM SUBSCRIPTION</p>

          <h1
            className="mt-2 text-3xl md:text-4xl font-bold
                         text-gray-900 dark:text-white"
          >
            Complete Your Payment
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Subscribe to TRM and start managing your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div
              className="bg-white dark:bg-gray-900
                            rounded-2xl shadow-lg
                            border border-gray-200
                            dark:border-gray-800 p-6 md:p-8"
            >
              <h2
                className="text-xl font-bold
                             text-gray-900 dark:text-white"
              >
                Payment Method
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose how you want to pay.
              </p>

              {/* Payment Methods */}
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {/* M-Pesa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`p-4 rounded-xl border text-left transition ${
                    paymentMethod === "mpesa"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="text-2xl">
                    <FaMobile className="text-green-600" />
                  </div>

                  <p
                    className="mt-2 font-semibold
                                text-gray-900 dark:text-white"
                  >
                    M-Pesa
                  </p>

                  <p className="text-xs text-gray-500">Mobile payment</p>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border text-left transition ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="text-2xl">
                    <FaCreditCard className="text-yellow-600" />
                  </div>

                  <p
                    className="mt-2 font-semibold
                                text-gray-900 dark:text-white"
                  >
                    Card
                  </p>

                  <p className="text-xs text-gray-500">Visa / Mastercard</p>
                </button>

                {/* Bank */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-4 rounded-xl border text-left transition ${
                    paymentMethod === "bank"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="text-2xl">
                    {" "}
                    <BuildingOffice2Icon className="md:w-10 w-5 h-5 md:h-10 text-cyan-400" />
                  </div>

                  <p
                    className="mt-2 font-semibold
                                text-gray-900 dark:text-white"
                  >
                    Bank
                  </p>

                  <p className="text-xs text-gray-500">Bank transfer</p>
                </button>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePayment} className="mt-8">
                {paymentMethod === "mpesa" && (
                  <div>
                    <label
                      className="block text-sm font-medium
                                      text-gray-700 dark:text-gray-300"
                    >
                      M-Pesa Phone Number
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0712 345 678"
                      required
                      className="mt-2 w-full rounded-lg
                                 border border-gray-300
                                 dark:border-gray-700
                                 bg-white dark:bg-gray-800
                                 px-4 py-3 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 text-gray-900 dark:text-white"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      You will receive an M-Pesa payment prompt on this number.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-sm font-medium
                                        text-gray-700 dark:text-gray-300"
                      >
                        Card Number
                      </label>

                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="mt-2 w-full rounded-lg
                                   border border-gray-300
                                   dark:border-gray-700
                                   bg-white dark:bg-gray-800
                                   px-4 py-3"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="rounded-lg border
                                   border-gray-300 dark:border-gray-700
                                   bg-white dark:bg-gray-800
                                   px-4 py-3"
                      />

                      <input
                        type="text"
                        placeholder="CVV"
                        className="rounded-lg border
                                   border-gray-300 dark:border-gray-700
                                   bg-white dark:bg-gray-800
                                   px-4 py-3"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div
                    className="rounded-lg bg-gray-50
                                  dark:bg-gray-800 p-5"
                  >
                    <h3
                      className="font-semibold
                                   text-gray-900 dark:text-white"
                    >
                      Bank Transfer
                    </h3>

                    <p
                      className="mt-3 text-sm text-gray-600
                                  dark:text-gray-400"
                    >
                      Your bank transfer instructions will be displayed after
                      you continue.
                    </p>
                  </div>
                )}

                {/* Pay Button */}
                <Link to="/Dev">
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full rounded-lg
                             bg-blue-600 px-6 py-4
                             font-semibold text-white
                             hover:bg-blue-700
                             disabled:opacity-50
                             transition"
                    //   onClick={handlePayment, <Navigate to="/admindashboard" />}
                  >
                    {loading ? "Processing Payment..." : `Pay $ ${amount}`}
                  </button>
                </Link>
              </form>

              {/* Security */}
              <div
                className="mt-6 flex items-center justify-center
                              gap-2 text-sm text-gray-500"
              >
                Secure payment
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div
              className="bg-white dark:bg-gray-900
                            rounded-2xl shadow-lg
                            border border-gray-200
                            dark:border-gray-800 p-6 sticky top-6"
            >
              <h2
                className="text-xl font-bold
                             text-gray-900 dark:text-white"
              >
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between">
                <div>
                  <p
                    className="font-semibold
                                text-gray-900 dark:text-white"
                  >
                    TRM {planName}
                  </p>

                  <p className="text-sm text-gray-500">Monthly subscription</p>
                </div>

                <p
                  className="font-semibold
                              text-gray-900 dark:text-white"
                >
                  $ {amount}
                </p>
              </div>

              <div
                className="border-t
                              border-gray-200
                              dark:border-gray-700 my-6"
              />

              <div className="flex justify-between">
                <span
                  className="text-gray-600
                                 dark:text-gray-400"
                >
                  Subtotal
                </span>

                <span
                  className="font-medium
                                 text-gray-900 dark:text-white"
                >
                  $ {amount}
                </span>
              </div>

              <div className="flex justify-between mt-3">
                <span
                  className="text-gray-600
                                 dark:text-gray-400"
                >
                  Billing
                </span>

                <span
                  className="text-gray-900
                                 dark:text-white"
                >
                  Monthly
                </span>
              </div>

              <div
                className="border-t
                              border-gray-200
                              dark:border-gray-700 my-6"
              />

              <div className="flex justify-between">
                <span
                  className="text-lg font-bold
                                 text-gray-900 dark:text-white"
                >
                  Total
                </span>

                <span
                  className="text-2xl font-bold
                                 text-blue-600"
                >
                  $ {amount}
                </span>
              </div>

              <div
                className="mt-6 rounded-lg bg-blue-50
                              dark:bg-blue-950 p-4"
              >
                <p
                  className="text-sm text-blue-700
                              dark:text-blue-300"
                >
                  Your subscription will renew monthly. You can manage your
                  subscription from your TRM dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
