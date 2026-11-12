
import React, { useState } from "react";

const categories = [
  "All",
  "Breakfast",
  "Main Course",
  "Fast Food",
  "Snacks",
  "Drinks",
  "Desserts",
  "Fruits",
];

const menuItems = [
  { id: 1, name: "Pancakes", category: "Breakfast", price: 350 },
  { id: 2, name: "English Breakfast", category: "Breakfast", price: 650 },
  { id: 3, name: "Grilled Chicken", category: "Main Course", price: 850 },
  { id: 4, name: "Beef Steak", category: "Main Course", price: 1200 },
  { id: 5, name: "Cheese Burger", category: "Fast Food", price: 550 },
  { id: 6, name: "French Fries", category: "Snacks", price: 250 },
  { id: 7, name: "Fresh Juice", category: "Drinks", price: 200 },
  { id: 8, name: "Chocolate Cake", category: "Desserts", price: 300 },
];

const MenuCategories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        );

  return (
    <div className=" bg-white p-2 rounded-xl shadow-sm w-auto">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Food Menu
        </h2>
        <p className="text-sm text-gray-500">
          Select a category to browse menu items
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-1 mb-1 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium
              whitespace-nowrap transition-all duration-200
              ${
                activeCategory === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4
              hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center gap-2">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {item.category}
                </p>
              </div>

              <span className="text-green-700 font-bold">
                KSh {item.price}
              </span>
            </div>
          </div>
        ))} */}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No menu items found in this category.
        </p>
      )}

    </div>
  );
};

export default MenuCategories;
