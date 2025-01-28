import { useCallback, useState } from "react";
import TextInput from "./components/TextInput";
import axios from "axios";
import Restaurants from "./views/Restaurants";
import useDebounce from "./hooks/useDebounce";
import DropDown from "./components/DropDown/DropDown";

export default function App() {
  const [resInput, setResInput] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = useCallback(() => {
    console.log("fetch!");

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
  }, [resInput]);

  useDebounce(fetchRestaurants, [], resInput, 500);

  const handleRestaurantInputChange = (value) => {
    setResInput(value);
  };

  const sortOptions = [
    {
      id: "rating",
      value: "Sort By Rating",
    },
    {
      id: "eta",
      value: "Sort By ETA",
    },
    {
      id: "name",
      value: "Sort By Name",
    },
  ];

  const [activeSortOption, setActiveSortOption] = useState(undefined);

  const onSortOptionChange = (option) => {
    setActiveSortOption(option);
  };

  const handleRestaurantSorting = (type, items) => {
    switch (type) {
      case "rating":
        items = items.sort(
          (a, b) => b.description.rating - a.description.rating
        );
        break;
      case "eta":
        items = items.sort(
          (a, b) =>
            parseInt(a.description.eta.split("min")[0]) -
            parseInt(b.description.eta.split("min")[0])
        );
        break;
      case "name":
        items = items.sort((a, b) =>
          a.description.name
            .toLowerCase()
            .localeCompare(b.description.name.toLowerCase())
        );
        break;
      default:
        break;
    }
    return items;
  };

  let sortedRestaurants = structuredClone(restaurants);

  if (activeSortOption !== undefined) {
    const type = sortOptions.find(
      (_item, index) => index === activeSortOption
    ).id;
    sortedRestaurants = handleRestaurantSorting(type, sortedRestaurants);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center justify-center mt-[2rem]">
        <TextInput
          className="w-[30vw] mr-[2rem]"
          value={resInput}
          onChange={(event) => handleRestaurantInputChange(event.target.value)}
          placeholder="Enter restaurant name"
        />
        <DropDown
          options={sortOptions}
          activeOption={activeSortOption}
          onChange={onSortOptionChange}
        />
      </div>
      <Restaurants restaurants={sortedRestaurants} />
    </div>
  );
}
