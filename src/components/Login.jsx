import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../fireBase.env/firebase.js";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";
import { TailSpin } from "react-loader-spinner";
const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [loading, setLoading] = useState(false);
  const checkLogin = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser && _data.mobile === form.mobile) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          navigate("/");
          swal({
            title: "Login Successfull!",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          return;
        } else {
          swal({
            title: "Invalid Credentials!",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };
  const [form, setForm] = useState({
    password: "",
    mobile: "923",
  });

  return (
    <div className=" h-4/5 mt-11 ">
      <div className=" flex flex-col  text-black items-center justify-center border border-solid border-green-500 rounded-lg p-12 md:w-3/5 lg:w-2/5 md:py-14 bg-slate-900 m-auto">
        <h1 className="text-white font-bold mb-8  text-xl">LogIn</h1>
        <div className="w-full">
        <label className="text-white mr-2">Phone Number:</label>
        <input
          type="number"
          name="number"
          value={form.mobile}
          onChange={(e) => {
            setForm({ ...form, mobile: e.target.value });
          }}
          placeholder="Enter Phone Number..."
          className=" border-none h-10 p-2 w-full"
        />
        </div >
        <div className="w-full mt-4">
          {" "}
          <label className="text-white mt-2 mr-2">Password:</label>
          <input
            type="password"
            name="pass"
            id="pass"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter Password..."
            className="border-none mt-0.5 h-10 p-2 w-full"
          />
        </div>
        <button
          className="bg-green-500 py-2 px-4 m-auto rounded-sm mt-9 text-white"
          onClick={checkLogin}
        >
          {loading ? <TailSpin height={15} color="white" /> : "Log IN"}
        </button>
        <p className="text-white">
          Or Create an Account-
          <Link to={"/signin"}>
            {" "}
            <button className="bg-none mt-3 text-blue-500 font-bold">
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
