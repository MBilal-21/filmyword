import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import app, { usersRef } from "../fireBase.env/firebase.js";
import bcrypt from "bcryptjs";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";

const Signin = () => {
  
  const auth = getAuth(app);
  // auth.useDeviceLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "923",
    password: "",
    name: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  // -----------------captcha function-------------------

  function get() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {},
    });
  }
  // ---
  function request() {
    setLoading(true);
    try {
      get();
      // ----
      const phoneNumber = `+${form.mobile}`;
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
          swal({
            title: "OTP sent Successfull",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          swal({
            title: error.message,
            text: "without + sign enter with contry code 923xxxxxxxx \n if error persist then refresh page",
            icon: "error",
            buttons: "ok",
            timer: 3000,
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  // ---
  const verify = () => {
    try {
      setLoading(true);
      const code = otp;
      window.confirmationResult
        .confirm(code)
        .then(() => {
          // User signed in successfully.
          uploadData();
          swal({
            title: "Successfully Registered",
            icon: "success",
            buttons: false,
            timer: 3000,
          });

          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // -----------upload data function------------------
  const uploadData = async () => {
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(form.password, salt);
    await addDoc(usersRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile,
    });
  };

  //   ------------------------------------------------------

  //   ------------------------------------------------------

  return (
    <div className=" h-4/5 mt-11 ">
      <div className=" flex flex-col  text-black items-center justify-center border border-solid border-green-500 p-12 md:w-3/5 lg:w-2/5 w-full bg-slate-900 m-auto rounded-lg">
        {otpSent ? (
          <>
            <h1 className="text-white font-bold mb-8  text-xl">Sign Up</h1>
            <div className="flex flex-col md:flex-row  md:w-96 items-center">
              <label htmlFor="enter otp" className="text-white mr-4">
                Enter your OTP:
              </label>
              <input
                type="number"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className=" border-none h-10 p-2"
              />
            </div>
            <button
              className="bg-green-500 py-2 px-4 m-auto rounded-sm mt-9 text-white"
              onClick={verify}
            >
              {loading ? <TailSpin height={20} color="white" /> : "confirm"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-white font-bold mb-8  text-xl">
              Create an Account
            </h1>
            <div className="w-full">
              <label className="text-white mr-2">Name:</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter User Name..."
                className=" border-none h-10 p-2 w-full"
              />
            </div>
            <div className="w-full mt-3">
              <label className="text-white mr-2">Phone Number:</label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="Enter Phone number..."
                className="border-none mt-0.5 h-10 p-2 w-full"
              />
            </div>{" "}
            <div className="w-full mt-3">
              <label className="text-white mr-2">Password:</label>
              <input
                type="password"
                name="pass"
                id="pass"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Set Password..."
                className="border-none mt-0.5 h-10 p-2 w-full"
              />
            </div>
            {/* <div id="recaptcha-container" className="mt-4"></div> */}
            <button
              className="bg-green-500 py-2 px-4 m-auto rounded-sm mt-6 text-white"
              onClick={request}
              id="sign-in-button"
              //  ----------------------
            >
              {loading ? <TailSpin height={20} /> : "Request OTP"}
            </button>
            <p className="text-white">
              Have a Account-
              <Link to={"/login"}>
                {" "}
                <button className="bg-none py-2 px-4 m-auto rounded-sm mt-3 text-blue-500 font-bold">
                  Login IN
                </button>
              </Link>
            </p>
          </>
        )}
      </div>
      {/* <div id="recaptcha-container"></div> */}
    </div>
  );
};

export default Signin;
