import Restaurant from "./Restaurant";

export default function Restaurants(props) {
  const { restaurants } = props;
  return (
    <>
      {" "}
      {(!restaurants || restaurants.length === 0) && (
        <div className="mt-[4rem] text-[3rem]">No Restaurants found !</div>
      )}
      {restaurants && restaurants?.length > 0 && (
        <div className="flex items-center flex-wrap gap-[3vw] mt-[5vh] p-[1rem] justify-center overflow-scroll sm:flex-row flex-col">
          {restaurants.map((restaurant) => (
            <Restaurant restaurant={restaurant} />
          ))}
        </div>
      )}
    </>
  );
}
