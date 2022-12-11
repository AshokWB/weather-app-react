import React from "react";
import { formatToLocalTime } from "../services/WeatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight text-center">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-lime-400 text-3xl font-medium text-center">{`${name}, `}</p>
        <p className="text-white text-3xl font-medium text-center">{` ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;