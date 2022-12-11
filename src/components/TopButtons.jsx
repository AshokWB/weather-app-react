import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Kathmandu",
    },
    {
      id: 2,
      title: "Dharan",
    },
    {
      id: 3,
      title: "Nepalgunj",
    },
    {
      id: 4,
      title: "Butwal",
    },
    {
      id: 5,
      title: "Bhairahawa",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;