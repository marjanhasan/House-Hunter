import Swal from "sweetalert2";

const Cards = ({ data }) => {
  const { address, available, bathrooms, bedrooms, city, size, picture, rent } =
    data;
  const handleBookings = () => {
    Swal.fire({
      title: "Sorry!",
      text: "This feature is not available due to unavoidable reasons",
      imageUrl:
        "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={picture} />
      </figure>
      <div className="mx-3 my-3">
        <h2 className="text-xl font-medium my-2">
          Room size: {size} is {available} at {rent} BDT
        </h2>
        <h2 className="text-lg font-medium my-2">
          Location: {address} in {city} city
        </h2>
        <div className="text-sm font-medium my-2 flex justify-between">
          <span>Bathrooms: {bathrooms}</span>
          <span>Bedrooms: {bedrooms}</span>
        </div>
        <div className="flex justify-center mt-3">
          <button className="btn" onClick={handleBookings}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
