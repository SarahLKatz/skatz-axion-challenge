import axios from "axios";
import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { GitHubRepository } from "../../types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./InputForm.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import { FormLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";

type InputFormProps = {
  setData: Dispatch<SetStateAction<GitHubRepository[]>>;
};

const RepoType = {
  ALL: "all",
  OWNER: "owner",
  MEMBER: "member",
} as const;

const SortType = {
  CREATED: "created",
  UPDATED: "updated",
  PUSHED: "pushed",
  FULL_NAME: "full_name",
} as const;

const DirectionType = {
  ASC: "asc",
  DESC: "desc",
} as const;

type FormValues = {
  username: string;
  repoType: (typeof RepoType)[keyof typeof RepoType];
  sort: (typeof SortType)[keyof typeof SortType];
  direction: (typeof DirectionType)[keyof typeof DirectionType];
  perPage?: number;
};

export const InputForm = ({ setData }: InputFormProps) => {
  const [error, setError] = useState("");

  const defaultValues = {
    username: "",
    repoType: RepoType.ALL,
    sort: SortType.FULL_NAME,
    direction: DirectionType.ASC,
    perPage: 30,
  };

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues,
    mode: "all",
  });

  const repoTypeValue = watch("repoType");
  const sortTypeValue = watch("sort");

  const fetchRepositories = async (values: FormValues) => {
    const { username, repoType, sort, direction, perPage } = values;
    if (!username) {
      setError("Must enter username or organization");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?type=${repoType}&sort=${sort}&direction=${direction}&per_page=${
          perPage || 30
        }`
      );
      setData(res.data);
    } catch (err) {
      console.error("Oops", err);
      // TODO: Error handling
    }
  };

  return (
    <div className="input-form">
      <form
        onSubmit={handleSubmit(fetchRepositories)}
        className="form-container"
      >
        <InputLabel id="username-input-label">
          Username or organization
        </InputLabel>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          aria-labelledby="username-input-label"
          {...register("username")}
        />
        <InputLabel id="repository-type-label">Repository type</InputLabel>
        <Select
          labelId="repository-type-label"
          id="repository-type"
          label="Repository type"
          value={repoTypeValue}
          {...register("repoType")}
        >
          <MenuItem value={RepoType.ALL}>{RepoType.ALL}</MenuItem>
          <MenuItem value={RepoType.OWNER}>{RepoType.OWNER}</MenuItem>
          <MenuItem value={RepoType.MEMBER}>{RepoType.MEMBER}</MenuItem>
        </Select>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          label="Sort"
          value={sortTypeValue}
          {...register("sort")}
        >
          <MenuItem value={SortType.CREATED}>{SortType.CREATED}</MenuItem>
          <MenuItem value={SortType.UPDATED}>{SortType.UPDATED}</MenuItem>
          <MenuItem value={SortType.PUSHED}>{SortType.PUSHED}</MenuItem>
          <MenuItem value={SortType.FULL_NAME}>full name</MenuItem>
        </Select>
        <FormLabel id="direction-label">Direction</FormLabel>
        <RadioGroup
          aria-labelledby="direction-label"
          row
          defaultValue={
            sortTypeValue === SortType.FULL_NAME
              ? DirectionType.ASC
              : DirectionType.DESC
          }
          {...register("direction")}
        >
          <FormControlLabel
            value={DirectionType.ASC}
            control={<Radio />}
            label="Ascending"
          />
          <FormControlLabel
            value={DirectionType.DESC}
            control={<Radio />}
            label="Descending"
          />
        </RadioGroup>
        <InputLabel id="per-page-input-label">Results per page</InputLabel>
        <TextField
          id="outlined-basic"
          label="Results per page"
          variant="outlined"
          aria-labelledby="per-page-input-label"
          defaultValue={30}
          {...register("perPage")}
        />
        <Button variant="contained" type="submit">
          Search Repositories
        </Button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};
