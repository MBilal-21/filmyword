import React, { useState } from "react";
import Header from "./components/Header";
import Cards from "./components/Cards";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Details from "./components/Details";
import { createContext } from "react";
import Signin from "./components/Signin";
import Login from "./components/Login";

const Appstate = createContext();




const App = () => {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
     </Appstate.Provider>
  );
};

export default App;
export { Appstate };



