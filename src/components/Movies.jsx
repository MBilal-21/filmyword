import React from "react";
import ReactStars from "react-stars";
const Movies = (props) => {
  return (
    <div className="mt-3 bg-slate-900 shadow-lg  hover:-translate-y-2 cursor-pointer w-auto  p-1 transition-all duration-200 md:w-auto max-w-xs mx-0.5">
      <img
        className="m-auto sm:h-72 h-1/4 w-1/4  sm:w-36 "
        src={props.movie.image}
        alt="poster"
      />
      <div className=" whitespace-nowrap text-ellipsis">
        <h1 className="text-ellipsis overflow-hidden w-32">{props.movie.name}</h1>
        <h1 className="flex items-center">
          <span className="text-yellow-400  ">Rating: </span>

          <ReactStars
            size={20} 
            half={true}
            value={props.movie.rating / props.movie.rated}
            edit={false}
            
          />
        </h1>
        <h1>
          <span className="text-gray-500">Year:</span> {props.movie.year}
        </h1>
      </div>
    </div>
  );
};

export default Movies;
