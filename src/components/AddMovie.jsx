import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../fireBase.env/firebase.js";
import swal from "sweetalert";
import { Appstate } from "../App.js";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    name: "",
    image: "",
    year: "",
    description: "",
    rating:0,
    rated:0,
  });
  const n=useNavigate();
  const [loading, setLoading] = useState(false);

  const addFunc = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Successfully added data",
          icon: "success",
          timer: 3000,
          buttons: false,
        });
      }else{
        n('/login');
        swal({
          title: "you should logged In first",
          icon: "warning",
          timer: 3000,
          buttons: false,
        });
      }
    } catch (err) {
      swal({
        title: err,
        text: "There was an error adding the document.",
        icon: "error",
        button: "Ok",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addFunc();
        }}
        className=" mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="mb-6">
          <h1 className="text-center text-3xl">Add Movie</h1>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-300">
              Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-300">
              Year
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: Number(e.target.value) })
                }
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-300">
              ImageLink
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="imageLink"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-300"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="descript"
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            
            type="submit"
            className="bg-blue-500 rounded-md p-3"
          >
            {" "}
            {loading ? <TailSpin height={25} color="white" /> : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddMovie;
