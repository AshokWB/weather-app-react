import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6 max-sm:flex-col">
      <div className="flex flex-row w-full items-center justify-center space-x-4 max-sm:flex-col">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="text-xl font-light p-2 min-w-screen shadow-xl focus:outline-none capitalize placeholder:lowercase max-sm:min-w-screen max-sm:min-w-max max-sm:ml-11"
        />
        <div className="flex flex-row items-center justify-center space-x-1 my-5 max-sm:flex-row">
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125 max-sm:mx-4"
          onClick={handleSearchClick}
          />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125 max-sm:mx-4"
          onClick={handleLocationClick}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-4 m-5 max-sm:flex-row">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125 max-sm:bg-gray-800 max-sm:p-2 max-sm:w-40 rounded-xl"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1 max-sm:hidden">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125 max-sm:bg-gray-800 max-sm:p-2 max-sm:w-40 rounded-xl"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;