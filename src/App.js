import { useEffect, useState } from "react";
import TextInput from "./components/TextInput";
import axios from "axios";

export default function App() {
  const [resInput, setResInput] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = () => {
    axios.get("/assets/data/db.json").then((response) => {
      const items = response.data.restaurants;
      setRestaurants(items);
    });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <TextInput
        className="mt-[2rem] w-[35%]"
        value={resInput}
        onChange={(event) => setResInput(event.target.value)}
        placeholder="Enter restaurant name"
      />
      <div className="flex items-center flex-wrap">
        {restaurants.map((restaurant) => (
          <div className="h-[5rem] w-[10rem] border-[black] border-[1px] rounded-[5px] p-[2rem]">
            <img
              className-="fit-content"
              src={restaurant.imageUrl}
              alt={restaurant.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
