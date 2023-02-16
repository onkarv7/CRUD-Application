import { useState } from "react";
import { TextField, Button, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./AddResourceForm"


const AddResourceForm = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const navigate = useNavigate();



  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setTags(event.target.value);
  };

  const handleCreateResourceItem = async () => {
    if (!name || !url || !description || !tags) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
      toast.error("Invalid URL");
      return;
    }

    const tagsArray = tags.split(",");
    const validTags = tagsArray.every((tag) => tag.trim() !== "");

    if (!validTags) {
      toast.error("Invalid tags");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://media-content.ccbp.in/website/react-assignment/add_resource.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            url,
            description,
            tags: tagsArray,
          }),
        }
      );

      if (response.ok) {
        setName("");
        setUrl("");
        setDescription("");
        setTags("");
        toast.success("Resource item created successfully");
      } else {
        throw new Error("Something went wrong. Please try again later");
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Box>
      <Header />
      <Box onClick={() => navigate("/home")} className="user">
        <img className="user_link" src="icon.png" alt="" />
        <Box className="user_title">Users</Box>
      </Box>
      <Box className="container_form">
        <Box className="form">
          <Box className="form_title">Item Details</Box>
          <InputLabel shrink htmlFor="ITEM_TITLE">
            ITEM TITLE
          </InputLabel>

          <TextField
            sx={{ mb: "40px" }}
            id="ITEM_TITLE"
            name="ITEM_TITLE"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            placeholder="iB studio trainees"
          />
          <InputLabel shrink htmlFor="LINK">
            LINK
          </InputLabel>

          <TextField
            sx={{ mb: "40px" }}
            id="LINK"
            name="LINK"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            placeholder="www.slack.iB studio trainees.com"
          />
          <InputLabel shrink htmlFor="ICON_URL">
            ICON URL
          </InputLabel>

          <TextField
            sx={{ mb: "40px" }}
            id="ICON_URL"
            name="ICON_URL"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            placeholder="www.slack.iB studio trainees.com"
          />
             <InputLabel shrink id="demo-simple-select-helper-label">
             TAG NAME
          </InputLabel>
     
        <Select
          sx={{ mb: "40px" }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={tags}
        

          onChange={(e) => setTags(e.target.value)}
        >
          <MenuItem value="">
          
          </MenuItem>
          <MenuItem >User</MenuItem>
          <MenuItem >Resourse</MenuItem>
          <MenuItem >Request</MenuItem>
        </Select>


          <InputLabel shrink htmlFor="CATEGORY">
            CATEGORY
          </InputLabel>

          <TextField
            sx={{ mb: "40px" }}
            id="CATEGORY"
            name="CATEGORY"
            variant="outlined"
            value={tags}
            onChange={handleCategoryChange}
            fullWidth
            placeholder="Slack"
          />
          <InputLabel shrink htmlFor="description">
            DESCRIPTION
          </InputLabel>
          <TextField
            sx={{ mb: "40px" }}
            variant="outlined"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            placeholder="This chaneel is for iB studio trainees
            team."
          />

          <button
            className="form_button"
            disabled={isLoading}
            onClick={handleCreateResourceItem}
          >
            CREATE
          </button>
        </Box>
        <div>
          <img className="form_image2" src="image2.png" />
        </div>
      </Box>
    </Box>
  );
};

export default AddResourceForm;
