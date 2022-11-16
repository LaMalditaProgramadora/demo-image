import { create } from "../services/MemeService";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

const MemeCreatePage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFilesChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const meme = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    console.log(meme);
    create(meme, file).then(
      (data) => {
        navigate("/memes/list", { replace: true });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid item xs={6} sx={{ mt: 1 }}>
        <TextField
          required
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          name="title"
          defaultValue=""
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }}>
        <TextField
          required
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          name="description"
          defaultValue=""
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <input
          color="primary"
          accept="image/*"
          type="file"
          onChange={handleFilesChange}
          id="icon-button-file"
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default MemeCreatePage;
