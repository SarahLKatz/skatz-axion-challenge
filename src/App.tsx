import { useState } from "react";
import "./App.css";
import { InputForm } from "./components/InputForm";
import { DataTable } from "./components/DataTable";
import type { GitHubRepository } from "./types";

function App() {
  const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
  return (
    <div className="container">
      <InputForm setData={setRepositoryData} />
      <DataTable repositories={repositoryData} />
    </div>
  );
}

export default App;
