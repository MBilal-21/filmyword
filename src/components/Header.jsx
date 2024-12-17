import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className="sticky top-0 bg-gray-900">
      <h1 className="text-red-500 text-2xl font-bold p-3 border-b-2 border-gray-50 flex  justify-between">
        <Link to={"/"}>
          {" "}
          <span>
            Filmy<span className="text-white">World</span>
          </span>
        </Link>
        {useAppstate.login ? (
          <Link to={"/addmovie"}>
            <Button
              variant="outlined"
              color="success"
              className="cursor-pointer"
            >
              <AddIcon className="mr-1 " color="inherit" />
              <span className="text-white">Add New</span>
            </Button>
          </Link>
        ) : (
          <Link to={"login"}>
            <Button
              variant="outlined"
              color="success"
              className="cursor-pointer"
            >
              <span className="text-white">LogIN</span>
            </Button>
          </Link>
        )}
      </h1>
    </div>
  );
};

export default Header;
