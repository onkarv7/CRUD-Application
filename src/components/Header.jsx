import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleAddResource = () => {
    navigate("/addresourse");
  };

  return (
    <Box className="header">
      <Box className="header_container">
        <Box onClick={() => navigate("/home")} className="header_right">
          <img className="header_icon" src="NxtWave.png" alt="" />
        </Box>
        <Box className="header_left">
          <button className="header_button" onClick={handleAddResource}>
            Add Item
          </button>

          <img className="header_img" src="image.png" />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
