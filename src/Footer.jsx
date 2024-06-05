import React from "react";
import openweather from "./assets/openweather.png";
function Footer() {
  return (
    <div className="flex selection:text-white ">
      <code className="selection:bg-black">Api used: </code>
      <a href="https://openweathermap.org/api">
        <img
          src={openweather}
          alt="openweather"
          className="h-6 hover:h-8 transition-all"
        />
      </a>
    </div>
  );
}

export default Footer;
