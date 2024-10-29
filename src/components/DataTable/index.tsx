import type { GitHubRepository } from "../../types";

type DataTableProps = {
  repositories: GitHubRepository[];
};

export const DataTable = ({ repositories }: DataTableProps) => (
  <>Number of repos: {repositories.length || 0}</>
);
