import { useState } from "react";
import "./App.css";
import { InputForm } from "./components/InputForm";
import { DataTable } from "./components/DataTable";
import type { GitHubRepository, SearchFormValues } from "./types";

function App() {
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
  const [filterValues, setFilterValues] = useState<SearchFormValues>({});

  return (
    <div className="container">
      <InputForm setData={setRepositoryData} updateFilters={setFilterValues} />
      <DataTable repositories={repositoryData} />
    </div>
  );
}

export default App;
