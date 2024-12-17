import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { moviesRef } from "../fireBase.env/firebase.js";
import { getDoc, doc } from "firebase/firestore";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";
const Details = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    async function get() {
      setLoading(true);
      const _data = await getDoc(doc(moviesRef, id));
      setData(_data.data());
      setLoading(false);
    }
    get();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="div2">
          <div className="div1">
            <ThreeCircles height={40} width={40} color="white" />
          </div>
        </div>
      ) : (
        <div className="p-4 flex justify-center items-center flex-col md:flex-row md:items-start ">
          <img
            className=" h-96 block mt-3 md:sticky md:top-16 "
            src={data.image}
            alt={data.name + "poster"}
          />
          <div className="md:ml-4 md:w-1/2 w-full ml-0 justify-center">
            <h1 className="text-3xl font-bold text-gray-500">
              {data.name} <span className="text-lg">({data.year})</span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating / data.rated}
              edit={false}
              className="  -z-10"
            />
            <p className="mt-2">{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
