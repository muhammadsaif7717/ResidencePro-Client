import { useState } from "react";
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newTheme = darkMode ? "light" : "dark";
    document.querySelector("body").setAttribute("data-theme", newTheme);
  };

  return (
    <div className="dark-mode-container flex justify-center items-center space-x-2 mb-4 border rounded-full border-gray-500 w-12">
      {!darkMode && (
        <FaMoon
          className="w-[33px] h-8 cursor-pointer text-black py-1"
          onClick={toggleDarkMode}
        />
      )}
      {darkMode && (
        <CiSun
          className="w-8 h-8 cursor-pointer text-yellow-500"
          onClick={toggleDarkMode}
        />
      )}
    </div>
  );
};

export default DarkMode;
