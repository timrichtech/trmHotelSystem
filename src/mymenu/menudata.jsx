import React, { createContext, useEffect, useState } from "react";
import image from "../resources/eel.jpg";
import axios from "axios";
import { method } from "lodash";

const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL2 = "https://0160-105-161-155-224.ngrok-free.app/";
const MenuContext = createContext();

const Food = [
  {
    id: 1,
    food_name: "Ugali",
    description: "Hot and sweet",
    quantity: 0,
    stock: 12,
    price: 30,
    image: image,
  },
  {
    id: 2,
    food_name: "Beef",
    description: "Hot and Delicious",
    quantity: 0,
    stock: 0,
    price: 80,
    image: image,
  },
  {
    id: 3,
    food_name: "Sukuma",
    description: "Fried",
    quantity: 0,
    stock: 2,
    price: 30,
    image: image,
  },
  {
    id: 4,
    food_name: "Tea",
    description: "Short and simple",
    quantity: 0,
    stock: 0,
    price: 20,
    image: image,
  },
  {
    id: 5,
    food_name: "Tea",
    description: "As black as Africa",
    quantity: 0,
    stock: 0,
    price: 30,
    image: image,
  },
  {
    id: 6,
    food_name: "Chicken",
    description: "Home grown",
    quantity: 0,
    stock: 0,
    price: 120,
    image: image,
  },
  {
    id: 7,
    food_name: "Eggs",
    description: "2 and Fried",
    quantity: 0,
    stock: 0,
    price: 80,
    image: image,
  },
  {
    id: 8,
    food_name: "Beans",
    description: "Tastier than your home's",
    quantity: 0,
    stock: 0,
    price: 50,
    image: image,
  },
  {
    id: 9,
    food_name: "Green grams",
    description: "Hot and Delicious",
    quantity: 0,
    stock: 0,
    price: 40,
    image: image,
  },
  {
    id: 10,
    food_name: "Andazi",
    description: "Hot and fluffy",
    quantity: 0,
    stock: 0,
    price: 20,
    image: image,
  },
  {
    id: 11,
    food_name: "Chapati",
    description: "Thin and see through",
    quantity: 0,
    stock: 0,
    price: 25,
    image: image,
  },
];

const MenuProvider = ({ children }) => {
  const [currentTable, setCurrentTable] = useState(null);
  const [food, setFood] = useState(Food);
  const [cart, setCart] = useState([]);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      first_name: "Timothy",
      middle_name: "Rich",
      last_name: "Maks",
      email: "tim_maks@gmail.com",
      department: "Kitchen",
      phone: "0545488",
      id_no: 2525525,
      kra: "P125455M",
    },
    {
      id: 2,
      first_name: "Timothy",
      middle_name: "Rich",
      last_name: "Maks",
      email: "tim_maks@gmail.com",
      department: "Kitchen",
      phone: "0545488",
      id_no: 2525525,
      kra: "P125455M",
    },
    {
      id: 3,
      first_name: "Timothy",
      middle_name: "Rich",
      last_name: "Maks",
      email: "tim_maks@gmail.com",
      department: "Waiter",
      phone: "0545488",
      id_no: 2525525,
      kra: "P125455M",
    },
  ]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [memes, setMemes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(Food);
  const [sales, setSales] = useState([
    {
      id: 1,
      date: "12/12/2024",
      time: "13:25",
      order_id: "KJL12D",
      amount: 300,
    },
  ]);

  const getTotal = (items = cart) => {
    let total = 0;
    if (items === null) {
      return total;
    }
    items.forEach((element) => {
      let subtotal = element.quantity * element.price;
      total += subtotal;
    });

    return total;
  };

  const updateOrder = async (order) => {
    try {
      const response = await axios.put(`${BASE_URL}hot/orders/`, { ...order });
      if (response.status === 200) {
        alert("Order update was successfull");
        setOrders(response.data);
      } else {
        alert("Update failed! Try again.");
      }
    } catch (error) {
      const response = await axios.put(`${BASE_URL2}hot/orders/`, { ...order });
      if (response.status === 200) {
        alert("Order update was successfull");
        setOrders(response.data);
      } else {
        alert("Update failed! Try again.");
      }
    }
  };

  const addToOrders = async (payment) => {
    let table = currentTable ? currentTable : null;
    const newOrder = {
      table: table,
      pay_status: payment.pay_status,
      amount: getTotal(),
      items: cart,
    };
    try {
      const response = await axios.post(`${BASE_URL}hot/orders/`, {
        ...newOrder,
      });
      if (response.status === 201) {
        alert("Order placed successfully");
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      alert("Internal server error!");
    }

    setCart([]);
    loadData();
  };

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await axios.get(`${BASE_URL}hot/employees/`);
        if (response.status === 200) {
          setEmployees(response.data);
        }
      } catch (error) {
        alert("Internal server error!");
      }
    };
    loadEmployees();
  }, []);

  const addToCart = (cartItem) => {
    let found = false;
    if (cart.length > 0) {
      let editedCart = cart.map((item) => {
        if (item.id === cartItem.id) {
          item.quantity += 1;
          found = true;
          return item;
        }
        return item;
      });
      if (!found) {
        setCart([...cart, { ...cartItem, quantity: 1 }]);
      } else {
        setCart([...editedCart]);
      }
    } else {
      let food = { ...cartItem, quantity: 1 };
      setCart([food]);
    }
  };

  const addProduct = (product) => {
    let myProduct = { ...product };
    myProduct.image = image;
    myProduct.id = products.length + 1;
    setProducts([...products, myProduct]);
  };

  const removeFromCart = (cartItem) => {
    let editedCart = cart.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity -= 1;
      }
      return item;
    });
    const filtered = editedCart.filter((item) => {
      return item.quantity === 0 ? false : true;
    });
    setCart([...filtered]);
  };

  const changeStock = (item, quantity) => {
    const altProducts = products.map((product) => {
      if (product.id === item.id) {
        product.stock = quantity;
        return product;
      }
      return product;
    });
    setProducts(altProducts);
  };

  //axios fetcher
  async function loadData() {
    try {
      const response = await axios.get(`${BASE_URL}hot/food/`);
      if (response.status === 200) {
        setProducts(response.data);
        setFood(response.data);
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      const response = await axios.get(`${BASE_URL2}hot/food/`);
      if (response.status === 200) {
        setProducts(response.data);
        setFood(response.data);
      } else {
        alert("Failed! Try again.");
      }
    }

    try {
      const response = await axios.get(`${BASE_URL}hot/items/`);
      if (response.status === 200) {
        setOrderedItems(response.data);
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      const response = await axios.get(`${BASE_URL2}hot/items/`);
      if (response.status === 200) {
        setOrderedItems(response.data);
      } else {
        alert("Failed! Try again.");
      }
    }

    try {
      const response = await axios.get(`${BASE_URL}hot/orders/`);
      if (response.status === 200) {
        setOrders(response.data);
        console.log(response.data);
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      const response = await axios.get(`${BASE_URL2}hot/orders/`);
      if (response.status === 200) {
        setOrders(response.data);
        console.log(response.data);
      } else {
        alert("Failed! Try again.");
      }
    }
    try {
      const response = await axios.get(`${BASE_URL}hot/food/`);
      if (response.status === 200) {
        setProducts(response.data);
        setFood(response.data);
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      const response = await axios.get(`${BASE_URL2}hot/food/`);
      if (response.status === 200) {
        setProducts(response.data);
        setFood(response.data);
      } else {
        alert("Failed! Try again.");
      }
    }
  }

  // setInterval(loadData, 10000)
  useEffect(() => {
    loadData();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        food,
        cart,
        memes,
        orderedItems,
        updateOrder,
        addProduct,
        setCart,
        getTotal,
        setCurrentTable,
        addToOrders,
        changeStock,
        loadData,
        currentTable,
        sales,
        orders,
        products,
        employees,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
export { MenuContext };
