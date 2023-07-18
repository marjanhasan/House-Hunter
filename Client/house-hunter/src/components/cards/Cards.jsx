const Cards = () => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8="
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
