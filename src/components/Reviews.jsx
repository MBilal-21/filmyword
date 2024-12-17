import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../fireBase.env/firebase.js";
import {
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
const Reviews = ({id,prevRating,userRated}) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [revLoading, setRevLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [size, setSize] = useState(0);
  const useAppstate = useContext(Appstate); 
  const n = useNavigate();

  const sendReviews = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        setForm("");
        setRating(0);
        swal({
          title: "Review Sent",
          icon: "success",
          buttons: "ok",
          timer: 3000,
        });

        setSize(1);
      } else {
        n("/login");
        swal({
          title: "you should logged In first",
          icon: "warning",
          timer: 3000,
          buttons: false,
        });
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "warning",
        buttons: "ok",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setRevLoading(true);
      setData([])
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setRevLoading(false);
    
      
    }
    getData();
  }, [size,id]);

  return (
    <div className="mt-4 w-full py-1 border-t-2 border-gray-600">
      <ReactStars
        size={25}
        half={true}
        edit={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        type="text"
        name="review"
        id="review"
        value={form}
        onChange={(e) => {
          setForm(e.target.value);
        }} 
        placeholder="Enter your thought.."
        className="w-full p-2 outline-none text-black bg-slate-400 placeholder:text-gray-700 "
      />
      <button
        className="w-full bg-green-500 p-2 mt-1 flex justify-center"
        onClick={sendReviews}
      >
        {loading ? <TailSpin height={20} color="black" /> : "Share"}
      </button>

      {revLoading ? (
        <div className="mt-8 flex justify-center">
          {" "}
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-8">
          {data.map((e, i) => {
            return (
              <div key={i} className="bg-gray-900 p-2 w-full mt-2">
                <div className="flex items-center">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-2 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={25}
                  half={true}
                  edit={true}
                  value={e.rating}
                  onChange={(rate) => setRating(rate)}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
