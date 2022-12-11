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
      title: "Lumbini",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-around">
      <div className="flex items-center justify-around my-6 mx-50 max-sm:flex-wrap max-sm:mx-10 max-sm:my-10 max-sm:hidden">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium mx-1"
            onClick={() => setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopButtons;
