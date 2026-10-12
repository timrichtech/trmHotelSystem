import React, { useEffect, useRef, useState } from "react";

export default function ClickOutsideBox() {
  const [isOpen, setIsOpen] = useState(true); // Box starts open
  const boxRef = useRef(null); // Reference to the box element

  useEffect(() => {
    // Function to handle clicks outside the box
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false); // Close the box
      }
    }

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      {isOpen && (
        <div
          ref={boxRef}
          style={{
            width: "200px",
            height: "150px",
            background: "#f0f0f0",
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <p>Click outside me to close</p>
        </div>
      )}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>Open Box</button>
      )}
    </div>
  );
}
