import { useState } from "react";
import "./App.css";
import { InputForm } from "./components/InputForm";
import { DataTable } from "./components/DataTable";
import type { GitHubRepository } from "./types";

function App() {
  // TODO: Type
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
  return (
    <>
      <InputForm setData={setRepositoryData} />
      <DataTable repositories={repositoryData} />
    </>
  );
}

export default App;
