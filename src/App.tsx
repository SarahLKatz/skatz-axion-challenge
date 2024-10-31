import { useState } from "react";
import "./App.css";
import { InputForm } from "./components/InputForm";
import { DataTable } from "./components/DataTable";
import type { GitHubRepository, SearchFormValues } from "./types";
import { defaultSearchValues } from "./constants";
import axios from "axios";

function App() {
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
  const [filterValues, setFilterValues] =
    useState<SearchFormValues>(defaultSearchValues);

  const fetchData = async (filters: SearchFormValues, page: number) => {
    const { username, repoType, sort, direction, perPage } = filters;

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?type=${repoType}&sort=${sort}&direction=${direction}&per_page=${
          perPage || 30
        }&page=${page}`
      );
      setRepositoryData(res.data);
    } catch (err) {
      console.error("Oops", err);
      // TODO: Error handling
    }
  };

  const updateDataOnPageChange = async (page: number) => {
    fetchData(filterValues, page);
  };

  return (
    <div className="container">
      <InputForm fetchData={fetchData} updateFilters={setFilterValues} />
      <DataTable
        repositories={repositoryData}
        onPageUpdate={updateDataOnPageChange}
      />
    </div>
  );
}

export default App;
