import { Card, Dialog } from "@mui/material";
import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function LoginPage() {
  const [open, setOpen] = useState(false);
  return (
    <Card
      className="min-h-fit mt-10 bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}

      {/* Modal */}
      <div className="relative z-1 w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        {/* bg-gradient-to-br from-[#8A263B] to-[#7C2437] */}
        {/* Left Side */}
        <div className="bg-blue-900 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-10">Success starts here</h1>

            <div className="space-y-7 text-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <p>Hotel Management</p>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <p>Reports & Analytics</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <p>'Quality User Experience</p>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">✓</span>
                <p>Access to Online Bookings and Customers across the globe</p>
              </div>
            </div>
          </div>

          {/* Image */}
          {/* <div className="flex w-full  mt-12">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
                alt="Woman"
                className="w-full"
              />
            </div> */}
        </div>

        {/* Right Side */}
        <div className="p-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Sign in to your account
          </h2>

          <p className="text-gray-600 mt-4 mb-10 text-lg">
            Don't have an account?{" "}
            <span className="underline font-medium cursor-pointer text-blue-500">
              Join here
            </span>
          </p>

          {/* Google */}
          <button className="w-full border rounded-lg py-4 px-6 flex items-center justify-center gap-4 hover:bg-gray-100 transition font-semibold text-lg">
            <FaGoogle className=" text-2xl" />
            Continue with Google
          </button>

          {/* Email */}
          <button className="w-full border rounded-lg py-4 px-6 flex items-center justify-center gap-4 hover:bg-gray-100 transition font-semibold mt-5 text-lg">
            <HiOutlineMail className="text-gray-700 text-2xl" />
            Continue with email/username
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="mx-5 text-gray-500 font-semibold">OR</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Apple & Facebook */}
          <div className="grid grid-cols-2 gap-5">
            <button className="border rounded-lg py-4 flex justify-center items-center gap-3 hover:bg-gray-100 transition font-semibold text-lg">
              <FaApple className="text-2xl" />
              Apple
            </button>

            <button className="border rounded-lg py-4 flex justify-center items-center gap-3 hover:bg-gray-100 transition font-semibold text-lg">
              <FaFacebookF className="text-blue-600 text-xl" />
              Facebook
            </button>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-12 leading-7">
            By joining, you agree to the HotMan{" "}
            <span className="text-green-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            and to occasionally receive emails from us. Please read our{" "}
            <span className="text-green-600 cursor-pointer">
              Privacy Policy
            </span>{" "}
            to learn how we use your personal data.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default LoginPage;
