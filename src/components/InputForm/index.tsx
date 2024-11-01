import { useState, type Dispatch, type SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from "react-hook-form";
import {
  defaultSearchValues,
  DirectionType,
  RepoType,
  SortType,
} from "../../constants";
import "./InputForm.css";
import type { SearchFormValues } from "../../types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";

type InputFormProps = {
  fetchData: (filters: SearchFormValues, page: number) => void;
  updateFilters: Dispatch<SetStateAction<SearchFormValues>>;
};

export const InputForm = ({ fetchData, updateFilters }: InputFormProps) => {
  const [error, setError] = useState("");

  const { register, handleSubmit, watch } = useForm<SearchFormValues>({
    defaultValues: defaultSearchValues,
    mode: "all",
  });

  const repoTypeValue = watch("repoType");
  const sortTypeValue = watch("sort");

  const fetchRepositories = async (values: SearchFormValues) => {
    const { username } = values;
    if (!username) {
      setError("Must enter username or organization");
      return;
    }
    await fetchData(values, 1);
    updateFilters(values);
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
