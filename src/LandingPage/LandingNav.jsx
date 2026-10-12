import React from "react";
import { useState } from "react";
import Home from "./Home.jsx";
import { Box, Stack } from "@mui/material";
import Pricing from "./Pricing.jsx";
import LoginPage from "./Login.jsx";
import About from "./About.jsx";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { Menu } from "@mui/icons-material";

function LandingNav() {
  const [content, setContent] = useState(<Home />);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Stack className="gap-y-1">
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/95 c dark:border-gray-800 dark:bg-[#070B22]/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-white"
          >
            TRM
          </Link>

          {/* Desktop Navigation  */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              // to="/"
              onClick={() => setContent(<Home />)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              // to="/about"
              onClick={() => setContent(<About />)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              About
            </Link>

            <Link
              // to="/pricing"
              onClick={() => setContent(<Pricing />)}
              className="font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              Pricing
            </Link>

            <Link
              // to="/login"
              onClick={() => setContent(<LoginPage />)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-white dark:hover:bg-gray-800"
          >
            {menuOpen ? (
              <span className="text-2xl">
                <FaWindowClose className="text-gray-500" />
              </span>
            ) : (
              <span className="text-2xl">
                <Menu />
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden dark:border-gray-800 dark:bg-[#070B22]">
            <div className="flex flex-col gap-3">
              <Link
                // to="/"
                onClick={() => {
                  setMenuOpen(false);
                  setContent(<Home />);
                }}
                className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Home
              </Link>

              <Link
                // to="/pricing"
                onClick={() => {
                  setMenuOpen(false);
                  setContent(<Pricing />);
                }}
                className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Pricing
              </Link>

              <Link
                // to="/about"
                onClick={() => {
                  setMenuOpen(false);
                  setContent(<About />);
                }}
                className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                About
              </Link>

              <Link
                // to="/login"
                onClick={() => {
                  setMenuOpen(false);
                  setContent(<LoginPage />);
                }}
                className="rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
      <Box className="bg-transparent h-screen pt-3">{content}</Box>
    </Stack>
  );
}

export default LandingNav;
