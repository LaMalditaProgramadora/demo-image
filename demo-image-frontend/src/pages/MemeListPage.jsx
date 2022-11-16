import { goImage, listAll, remove } from "../services/MemeService";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MemeListPage = () => {
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);

  const listAllFromApi = () => {
    listAll().then(
      (data) => {
        if (data) {
          setMemes(data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeFromApi = (id) => {
    remove(id).then(
      (data) => {
        listAllFromApi();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const goCreateMeme = () => {
    navigate("/memes/create", { replace: true });
  };

  useEffect(() => {
    listAllFromApi();
  }, []);

  return (
    <>
      <Button variant="contained" onClick={goCreateMeme}>
        Create
      </Button>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memes.map((meme) => (
              <TableRow
                key={meme.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {meme.title}
                </TableCell>
                <TableCell>{meme.description}</TableCell>
                <TableCell>
                  <img width="60" height="60" src={'http://localhost:8080/memes/uploads/'+ meme.imageUrl}/>
                </TableCell>
                <TableCell>
                  {" "}
                  <DeleteIcon
                    onClick={() => removeFromApi(meme.id)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MemeListPage;
