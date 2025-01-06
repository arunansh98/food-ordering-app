import Rating from "./Rating";

export default function Restaurant(props) {
  const { restaurant } = props;
  return (
    <div className="h-[40vh] w-[40vw] border-[grey] border-[1px] rounded-[5px] p-[2rem] overflow-auto cursor-pointer flex flex-col items-center justify-between gap-[0.7rem] hover:shadow-black">
      <img
        className="w-[80%] h-[70%]"
        src={`${process.env.PUBLIC_URL}${restaurant.imageUrl}`}
        alt={restaurant.id}
      />
      <h1 className="text-[1.1em]">{restaurant.description.name}</h1>
      <div className="flex flex-row items-center">
        <h1 className="text-[1.1em] mr-[0.3rem]">
          {restaurant.description.rating}
        </h1>
        <Rating rating={restaurant.description.rating} />
      </div>
      <h1 className="text-[1.1em]">ETA : {restaurant.description.eta}</h1>
    </div>
  );
}
