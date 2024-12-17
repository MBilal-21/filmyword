import React, { useState, useEffect } from "react";
import Movies from "./Movies";
// import movie from "./Hmovie.json";
import { ThreeCircles } from "react-loader-spinner";
import { getDocs } from "firebase/firestore"; // Import 'doc' for creating a DocumentReference
import { moviesRef } from "../fireBase.env/firebase.js";
import { Link } from "react-router-dom";
// import swal from "sweetalert";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      await getDocs(moviesRef)
        .then((_data) =>
          _data.forEach((doc) => {
            setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
            setLoading(false);
          })
        )
        .catch((err) => {
         window.alert(`an ${err} occur`);
        });

    }

    getData();
  }, []);
    

  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="div2">
          <div className="div1">
            <ThreeCircles height={40} width={40} color="white" />
          </div>
        </div>
      ) : (
        data.map((movie, i) => (
          <Link to={`/detail/${movie.id}`} key={i}>
            {" "}
            <Movies movie={movie} />
          </Link>
        ))
      )}
    </div>
  );
};

export default Cards;
