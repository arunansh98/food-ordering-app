import { useEffect, useMemo, useState } from "react";
import TextInput from "./components/TextInput";
import axios from "axios";
import debounce from "lodash.debounce";
import Restaurants from "./views/Restaurants";

export default function App() {
  const [resInput, setResInput] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = () => {
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

  const debouncedFetchRestaurants = useMemo(
    () => debounce(fetchRestaurants, 500),
    [resInput]
  );

  useEffect(() => {
    debouncedFetchRestaurants();
  }, [resInput]);

  useEffect(() => {
    return () => debouncedFetchRestaurants.cancel();
  }, [debouncedFetchRestaurants]);

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
      <Restaurants restaurants={restaurants} />
    </div>
  );
}
