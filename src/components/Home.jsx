// import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardItem from "./CardItem";
import { Container } from "@mui/system";
import { Grid, IconButton, Box, InputBase } from "@mui/material";
import Header from "./Header";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import "./Home.css"
import {CircularProgress} from "@mui/material";

export default function Home() {
  const [resources, setResources] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Resources");
  const[loading, setLoading] = useState(false)

  useEffect(() => {
   
    const getResources = async () => {
      setLoading(true);
      try{
        const response = await axios.get(
          "https://media-content.ccbp.in/website/react-assignment/resources.json"
        );
        setResources(response.data);
        // console.log(response.data);
        // toast.success(" fetching data")
        setLoading(false);
      }catch(err){
        toast.error("Error while fetching data")
        setLoading(false);
      }
    
    };
    getResources();
  }, []);

  const filteredResources = resources.filter((resource) => {
    if (activeTab === "Requests" && !resource.tag.includes("request")) {
      return false;
    }
    if (activeTab === "Users" && !resource.tag.includes("user")) {
      return false;
    }
    if (
      searchTerm &&
      !resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(
    indexOfFirstResource,
    indexOfLastResource
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <Header />
      {loading  ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box> ) : ""}
      <div>
        <div className="tabs">
          <button
            className={
              activeTab === "Resources" ? "active" : "resources_button"
            }
            onClick={() => handleTabChange("Resources")}
          >
            Resources
          </button>
          <button
            className={activeTab === "Requests" ? "active" : "requests_button"}
            onClick={() => handleTabChange("Requests")}
          >
            Requests
          </button>
          <button
            className={activeTab === "Users" ? "active" : "users_button"}
            onClick={() => handleTabChange("Users")}
          >
            Users
          </button>
        </div>

        <Box className="search">
          <IconButton  sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            // sx={{ ml: 1, flex: 1 }}
            placeholder="Search "
            inputProps={{ "aria-label": "search " }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
      </div>
      <Container maxWidth="lg">
        <Grid container spacing={2} py={10} rowSpacing={8}>
          {currentResources.slice(0, 6).map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={4}>
              <CardItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {filteredResources.length > resourcesPerPage && (
        <div className="pagination">
          <button onClick={() => paginate(1)}>1</button>
          <button onClick={() => paginate(2)}>2</button>
          <button onClick={() => paginate(3)}>3</button>
          <button onClick={() => paginate(4)}>4</button>
        </div>
      )}
    </div>
  );
}
