import { useEffect, useState } from "react";
import TextInput from "./components/TextInput";
import axios from "axios";

export default function App() {
  const [resInput, setResInput] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = () => {
    console.log({ resInput });

    axios
      .get(`${process.env.PUBLIC_URL}/assets/data/db.json`)
      .then((response) => {
        const items = response.data.restaurants.filter((res) =>
          resInput && resInput !== ""
            ? res.description.name
                .toLowerCase()
                .includes(resInput.toLowerCase())
            : true
        );
        setRestaurants(items);
      });
  };

  useEffect(() => {
    fetchRestaurants();
  }, [resInput]);

  const handleRestaurantInputChange = (value) => {
    setResInput(value);
  };

  return (
    <div className="flex flex-col items-center">
      <TextInput
        className="mt-[2rem] w-[35%]"
        value={resInput}
        onChange={(event) => handleRestaurantInputChange(event.target.value)}
        placeholder="Enter restaurant name"
      />
      <div className="flex items-center flex-wrap gap-[3vw] mt-[5vh] justify-center overflow-scroll sm:flex-row flex-col">
        {restaurants.map((restaurant) => (
          <div className="h-[40vh] w-[40vw] border-[black] border-[1px] rounded-[5px] p-[2rem] overflow-auto cursor-pointer flex flex-col items-center justify-between gap-[0.7rem]">
            <img
              className="w-[80%] h-[70%]"
              src={`${process.env.PUBLIC_URL}${restaurant.imageUrl}`}
              alt={restaurant.id}
            />
            <h1 className="text-[1.1em]">{restaurant.description.name}</h1>
            <h1 className="text-[1.1em]">{restaurant.description.rating}</h1>
            <h1 className="text-[1.1em]">
              ETA : {restaurant.description.rating}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
