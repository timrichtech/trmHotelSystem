import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const OrganizerContext = createContext();

const OrganProvider = ({ children }) => {
  const [tables, setTables] = useState([]);

  const addTable = async (table) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/hot/tables/",
        { table_name: table },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 201) {
        setTables(response.data);
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      alert("Internal server error!");
    }

    // setTables([...tables, newTable]);
  };

  //axios fetcher
  async function loadTables() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/hot/tables/");
      if (response.status === 200) {
        setTables(response.data);
      } else {
        alert("Failed! Try again.");
      }
    } catch (error) {
      alert("Server down :( !");
    }
  }

  useEffect(() => {
    loadTables();
  }, []);

  const alterTable = async (bookedTable) => {
    try {
      const response = await axios.patch("http://127.0.0.1:8000/hot/tables/", {
        table: bookedTable,
      });
      if (response.status === 200) {
        const altered = tables.map((table) => {
          return (table.id = response.data[0].id ? response.data[0] : table);
        });
        setTables(altered);
      } else {
        alert("Update failed! Try again.");
      }
    } catch (error) {
      alert("Server down :( !");
    }
  };

  return (
    <OrganizerContext.Provider
      value={{
        tables,
        addTable,
        alterTable,
        loadTables,
      }}
    >
      {children}
    </OrganizerContext.Provider>
  );
};

export default OrganProvider;
export { OrganizerContext };
