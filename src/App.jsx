import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import env from "../env.json";
const App = () => {
  function capitalizeEachWord(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
      })
      .join(" ");
  }
  const [key, setKey] = useState(env.apiKey);
  const [temp, setTemp] = useState(null);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [uv, setUV] = useState();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [feelslike, setFeelsLike] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);
  useEffect(() => {
    lat &&
      lon &&
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`
      )
        .then((res) => {
          res.json().then((data) => {
            setTemp(data.current.temp - 273);
            setSunrise(data.current.sunrise);
            setSunset(data.current.sunset);
            setDescription(data.current.weather[0].description);
            setIcon(data.current.weather[0].icon);
            setUV(data.current.uvi);
            setFeelsLike(data.current.feels_like - 273);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${key}`
    )
      .then((res) => {
        res.json().then((data) => {
          setName(data[0].name);
          setCountry(data[0].country);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [lat, lon]);
  return (
    <>
      {lat && lon ? (
        temp ? (
          <section className="flex justify-center h-screen items-center flex-col gap-4  ">
            <div className="peer flex justify-center items-center gap-2 text-2xl rubik bg-orange-400 h-screen w-screen md:h-max md:w-max p-16 md:rounded-xl shadow-xl  md:hover:scale-150 transition-all cursor-default lg:hover:rounded-3xl  flex-col ">
              <div className="flex  flex-col gap-2 ">
                <div className="flex justify-center flex-col gap-2">
                  <p className="flex justify-center">
                    <span className="bg-white  p-1 rounded-lg w-min md:my-0 my-10 top-0 absolute md:static">
                      <span className="text-5xl my-5 mx-7 md:mx-0 md:my-5">
                        {icon === "01d"
                          ? "☀️"
                          : icon === "01n"
                          ? "🌕"
                          : icon === "02d"
                          ? "🌤️"
                          : icon === "02n"
                          ? "💭"
                          : icon === "03d"
                          ? "☁️"
                          : icon === "03n"
                          ? "☁️"
                          : icon === "04d"
                          ? "☁"
                          : icon === "04n"
                          ? "☁"
                          : icon === "09d"
                          ? "🌧️"
                          : icon === "09n"
                          ? "🌧️"
                          : icon === "10d"
                          ? "🌦️"
                          : icon === "10n"
                          ? "🌧️"
                          : icon === "11d"
                          ? "⛈️"
                          : icon === "11n"
                          ? "⛈️"
                          : icon === "13d"
                          ? "❄️"
                          : icon === "13n"
                          ? "❄️"
                          : icon === "50d"
                          ? "mist"
                          : icon === "50n"
                          ? "mist"
                          : "Unidentified"}
                      </span>
                    </span>
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-2 md:static relative mb-52  md:mb-0 mt-10 md:mt-0">
                  <p className="flex justify-center">
                    <span>Temprature: {Math.round(temp)}°C</span>
                  </p>
                  <p className="justify-center flex">
                    <span>Feels Like: {Math.round(feelslike)}°C</span>
                  </p>
                  <p className="flex justify-center">
                    <span>{capitalizeEachWord(description)}</span>
                  </p>
                  <p className="flex justify-center">
                    <span>Current UV: {uv}</span>
                  </p>
                  <p className="flex justify-center">
                    <span>
                      Sunrise: {new Date(sunrise * 1000).getHours() % 12 || 12}:
                      {new Date(sunrise * 1000).getMinutes() < 10
                        ? "0" + new Date(sunrise * 1000).getMinutes()
                        : new Date(sunrise * 1000).getMinutes()}
                      &nbsp;AM
                    </span>
                  </p>
                  <p className="flex justify-center">
                    <span>
                      Sunset: {new Date(sunset * 1000).getHours() % 12 || 12}:
                      {new Date(sunset).getMinutes() < 10
                        ? "0" + new Date(sunset * 1000).getMinutes() < 10
                        : new Date(sunset * 1000).getMinutes()}
                      &nbsp;PM
                    </span>
                  </p>
                </div>
              </div>
              {name && (
                <p className="md:invisible md:mt-0  visible absolute pt-64 md:pt-0 text-white text-pretty font-normal selection:text-black selection:bg-white">
                  <code>
                    {name}
                    {country && ", " + country}
                  </code>
                </p>
              )}
            </div>
            {name && (
              <code className="text-2xl selection:text-white selection:bg-black hidden md:flex ">
                {name}
                {country && ", " + country}
              </code>
            )}
            <div className="hidden md:block">
              {lat && lon && temp && (
                <span className="invisible md:visible ">
                  <Footer />
                </span>
              )}
            </div>
          </section>
        ) : (
          <code className="flex justify-center my-10 ">Fetching Data.....</code>
        )
      ) : (
        <code className="flex justify-center md:h-screen items-center relative md:static my-28 md:my-0">
          Check your location settings & Refresh...
        </code>
      )}
    </>
  );
};

export default App;
