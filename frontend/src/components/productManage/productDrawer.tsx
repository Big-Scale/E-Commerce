import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { useMutation } from "@apollo/client";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { pink } from "@mui/material/colors";

import { CREATE_CATEGORY_MUTATION } from "../../graphql/mutations";
import { GET_CATEGORIES_QUERY } from "../../graphql/queries";
import { UPDATE_CATEGORY_MUTATION } from "../../graphql/mutations";
import { DELETE_CATEGORY_MUTATION } from "../../graphql/mutations";

import { CREATE_PRODUCT_MUTATION } from "../../graphql/mutations";

import CreateCategory from "./createCategory";

interface ProductDrawerProps {
  open: boolean;
  categories: {
    id: number;
    name: string;
    description: string;
  }[];
  openDrawer: (val: boolean) => void;
}

interface CreateCategoryInput {
  name: string;
  description: string;
}

export default function ProductDrawerCpn({
  open,
  openDrawer,
  categories,
}: ProductDrawerProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDlg, setOpenDeleteDlg] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // const [imageFile, setImageFile] = React.useState(File);
  const [tempImageSrc, setTempImageSrc] = React.useState<
    string | ArrayBuffer | null
  >(null);

  const [createCategory, { data, loading, error }] = useMutation(
    CREATE_CATEGORY_MUTATION,
    {
      refetchQueries: [
        { query: GET_CATEGORIES_QUERY }, // The query you want to refetch
      ],
    }
  );

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION, {
    refetchQueries: [
      { query: GET_CATEGORIES_QUERY }, // The query you want to refetch
    ],
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    refetchQueries: [
      { query: GET_CATEGORIES_QUERY }, // The query you want to refetch
    ],
  });

  const handleClickOpenDialog = () => {
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const list = () =>
    !isLoading ? (
      <div className="h-padding" style={{ marginTop: "30px" }}>
        <Box sx={{ width: 300 }} role="presentation">
          <List>
            {categories.map((aCategory, index) => (
              <ListItem key={aCategory.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BorderAllIcon />
                  </ListItemIcon>
                  <ListItemText primary={aCategory.name} />
                </ListItemButton>
                <IconButton
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={() => {
                    setEditMode(true);
                    setCurrentCategory(index);
                    setName(categories[index].name);
                    setDescription(categories[index].description);
                    setOpenDialog(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={() => {
                    setCurrentCategory(index);
                    setName(categories[index].name);
                    setDescription(categories[index].description);
                    setOpenDeleteDlg(true);
                  }}
                >
                  <DeleteIcon sx={{ color: pink[500] }} />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <div className="v-padding" style={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleClickOpenDialog}
            >
              Add Category
            </Button>
          </div>
        </Box>
      </div>
    ) : (
      <div className="h-padding">
        <Box sx={{ width: 300 }}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="v-margin">
              <Skeleton variant="rectangular" height={50} animation="wave" />
            </div>
          ))}
        </Box>
      </div>
    );
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={open} onClose={() => openDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            if (editMode === true) {
              // const input: UpdateCreateCateogryInput = {name, description};
              setUserId(categories[currentCategory]["id"]);
              console.log(userId, categories);

              updateCategory({
                variables: {
                  input: {
                    id: categories[currentCategory]["id"],
                    name: name,
                    description: description,
                  },
                },
              });
            } else {
              const input: CreateCategoryInput = { name, description };
              createCategory({
                variables: {
                  input: {
                    name: input.name,
                    description: input.description,
                  },
                },
              });
            }

            if (loading) {
              console.log("loading");
            }
            if (error) {
              console.log("error");
            }
            console.log(formJson);

            handleCloseDialog();
          },
        }}
      >
        {loading && <LinearProgress />}
        <DialogTitle>{`${
          editMode ? "Edit" : "Add"
        }Product Category`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`To ${
              editMode ? "Edit" : "Add"
            } product category, please enter category info here.`}
          </DialogContentText>
          <div
            style={{ marginTop: "10px", marginBottom: "10px", display: "flex" }}
          >
            <Button
              style={{ height: "40px", marginRight: "30px" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files && event.target.files[0];
                  console.log(file);
                  if (file) {
                    // Use FileReader to read the file and set it as temp image source
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === FileReader.DONE) {
                        setTempImageSrc(reader.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
            {tempImageSrc ? (
              <img
                src={tempImageSrc?.toString()}
                alt="Preview"
                className="category_img"
              />
            ) : (
              <img src="/img/empty.png" className="category_img" alt="empty" />
            )}
          </div>
          <div className="v-margin">
            <TextField
              defaultValue={editMode ? categories[currentCategory]?.name : ""}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Category Name"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="v-margin">
            <TextField
              defaultValue={
                editMode ? categories[currentCategory]?.description : ""
              }
              required
              variant="standard"
              fullWidth
              id="outlined-multiline-flexible"
              name="description"
              label="description"
              multiline
              rows={5}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit"> {editMode ? "Edit" : "Add"}</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDlg}
        onClose={() => setOpenDeleteDlg(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure want to delete ${categories[currentCategory]?.name} category?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete Category, all products in that category will be
            deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDlg(false)}>Cancel</Button>
          <Button
            onClick={() => {
              console.log(currentCategory, userId, categories);
              console.log(categories[currentCategory]["id"]);

              deleteCategory({
                variables: {
                  id: categories[currentCategory]["id"],
                },
              });
              setOpenDeleteDlg(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* <CreateCategory></CreateCategory> */}
    </div>
  );
}
