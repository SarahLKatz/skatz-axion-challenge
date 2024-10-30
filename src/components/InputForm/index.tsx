import axios from "axios";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { GitHubRepository } from "../../types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./InputForm.css";

type InputFormProps = {
  setData: Dispatch<SetStateAction<GitHubRepository[]>>;
};

export const InputForm = ({ setData }: InputFormProps) => {
  const fetchRepositories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    // Check that username exists

    try {
      // TODO: Only works for usernames - need to update to work for org (maybe add a checkbox to see which it is)
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setData(res.data);
    } catch (err) {
      console.error("Oops", err);
      // TODO: Error handling
    }
  };

  return (
    <div className="input-form">
      <form onSubmit={fetchRepositories} className="form-container">
        <Typography variant="body1" component="span">
          Username or organization
        </Typography>
        <TextField
          hiddenLabel
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
        />
        <Button variant="contained" type="submit">
          Search Repositories
        </Button>
      </form>
    </div>
  );
};
